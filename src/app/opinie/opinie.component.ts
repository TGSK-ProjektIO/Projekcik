import {Component, OnInit, ViewChild} from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {RatingComponent} from "./rating/rating.component";
import {OpinionHostDirective} from "./opinion-host.directive";
import {OpinionCreatorComponent} from "./opinion-creator/opinion-creator.component";

// TODO: get user type from session
export enum UserType { anon, logged, admin}

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {
  // TODO: get user type from session
  userType : UserType = UserType.admin;
  userLoggedID = "2000";
  isUserType(type : UserType) : boolean {
    return this.userType == type;
  }
  // TODO: get product attributes from product
  productAttributes : string[] = ["fajno", "niefajno", "zajefajno", "wydajność"];

  allOpinions : CompleteOpinionComponent[] = [];
  allOpinionsRefs : CompleteOpinionComponent[] = [];
  opinionCreator : OpinionCreatorComponent = new OpinionCreatorComponent(this);
  @ViewChild(OpinionHostDirective, {static: true}) opinionHost!: OpinionHostDirective;

  constructor() {  }

  ngOnInit(): void {
    // =======================================
    //                 TEMP
    //  TODO: replace with getting data from database
    //
    let opinions : CompleteOpinionComponent[] = [];
    for (let i = 0; i < 5; i++) {
      let opinion = new CompleteOpinionComponent();
      opinion.SetParent(this);
      opinion.ID = i;
      opinion.userID = String(i + 1000);
      opinion.SetReview("AAAAAAAAAAAAAAAAAAAAAAA");
      for (const attribute of this.productAttributes) {
        opinion.SetRating(attribute, Math.floor(Math.random() * (5 - 1 + 1)) + 1);
      }
      opinion.opinionRating.likes = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      opinion.opinionRating.dislikes = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      opinions.push(opinion);
    }
    this.allOpinions = opinions;
    // =======================================

    this.ShowAllOpinions();

    // Create opinion creator
    if(this.userType == UserType.logged) {
      this.opinionCreator = this.opinionHost.viewContainerRef.createComponent<OpinionCreatorComponent>(OpinionCreatorComponent, {index: 0}).instance;
      this.opinionCreator.parent = this;
      // TODO: get attributes from product
      this.opinionCreator.AddRatings(this.productAttributes);
    }
  }

  CreateOpinion(newOpinion : CompleteOpinionComponent): void {
    // TODO: add opinion to database
    newOpinion.userID = this.userLoggedID;
    newOpinion.ID = this.allOpinions.length;
    this.allOpinions.unshift(newOpinion);
    this.ShowOpinion(newOpinion, 1);

    console.log(this.allOpinions);
  }

  GetOpinion(ID: number): CompleteOpinionComponent | undefined {
    for (const opinion of this.allOpinions) {
      if(opinion.ID == ID) return opinion;
    }
    return undefined;
  }

  GetUserOpinions(userID : string) : Array<CompleteOpinionComponent>{
    let result = new Array<CompleteOpinionComponent>();
    for (const opinion of this.allOpinions) {
      if(opinion.userID == userID) result.push(opinion)
    }
    return  result;
  }

  public ShowAllOpinions(): void {
    //viewContainerRef.clear();
    for (const opinion of this.allOpinions) {
      this.ShowOpinion(opinion);
    }
  }

  private ShowOpinion(opinion : CompleteOpinionComponent, index: number = this.allOpinionsRefs.length) {
    const componentRef = this.opinionHost.viewContainerRef.createComponent<CompleteOpinionComponent>(CompleteOpinionComponent, {index: index}).instance;
    componentRef.SetParent(this);
    componentRef.canEdit = (opinion.userID == this.userLoggedID);
    componentRef.ID = opinion.ID;
    componentRef.userID = opinion.userID;
    componentRef.review = opinion.review;
    componentRef.ratings = opinion.ratings;
    componentRef.opinionRating = opinion.opinionRating;
    this.allOpinionsRefs.splice(index, 0, componentRef);
  }

  ModifyOpinion(ID: number, ratings: RatingComponent[], text: string): void {
    for (const opinion of this.allOpinions) {
      if(opinion.ID == ID) {
        opinion.ratings = ratings;
        opinion.review.SetReview(text);
        break;
      }
    }
  }

  DeleteOpinion(ID: number): boolean {
    //todo: remove from database
    for (let i = 0; i < this.allOpinions.length; i++) {
      // TODO: may be problematic if sorting gets implemented
      if(this.allOpinions[i].ID == ID) {
        this.allOpinions.splice(i, 1);
        break;
      }
    }
    for (let i = 0; i < this.allOpinionsRefs.length; i++) {
      // TODO: may be problematic if sorting gets implemented
      if(this.allOpinionsRefs[i].ID == ID) {
        this.opinionHost.viewContainerRef.get(i)?.destroy();
        this.allOpinionsRefs.splice(i, 1);
        break;
      }
    }
    return true;
  }
}
