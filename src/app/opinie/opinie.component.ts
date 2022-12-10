import {Component, OnInit, ViewChild} from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {RatingComponent} from "./rating/rating.component";
import {OpinionHostDirective} from "./opinion-host.directive";
import {OpinionCreatorComponent} from "./opinion-creator/opinion-creator.component";

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {
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
    for (let i = 0; i < 10; i++) {
      let opinion = new CompleteOpinionComponent();
      opinion.SetParent(this);
      opinion.ID = opinions.length;
      opinion.userID = String(opinions.length + 1000);
      opinion.SetReview("AAAAAAAAAAAAAAAAAAAAAAA");
      opinion.SetRating("fajno", Math.floor(Math.random() * (5 - 1 + 1)) + 1);
      opinion.SetRating("niefajno", Math.floor(Math.random() * (5 - 1 + 1)) + 1);
      opinion.SetRating("zajefajno", Math.floor(Math.random() * (5 - 1 + 1)) + 1);
      opinion.SetRating("wydajność", Math.floor(Math.random() * (5 - 1 + 1)) + 1);
      opinion.opinionRating.likes = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      opinion.opinionRating.dislikes = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      opinions.push(opinion);
    }
    this.allOpinions = opinions;
    // =======================================
    const componentRef = this.opinionHost.viewContainerRef.createComponent<OpinionCreatorComponent>(OpinionCreatorComponent).instance;
    componentRef.parent = this;

    this.ShowAllOpinions();
  }

  CreateOpinion(newOpinion : CompleteOpinionComponent): void {
    // TODO: add opinion to database
    this.allOpinions.push(newOpinion);
    this.ShowOpinion(newOpinion);
  }

  GetOpinion(ID: number): CompleteOpinionComponent {
    return new CompleteOpinionComponent();
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

  private ShowOpinion(opinion : CompleteOpinionComponent) {
    const componentRef = this.opinionHost.viewContainerRef.createComponent<CompleteOpinionComponent>(CompleteOpinionComponent).instance;
    componentRef.SetParent(this);
    componentRef.ID = opinion.ID;
    componentRef.review = opinion.review;
    componentRef.ratings = opinion.ratings;
    componentRef.opinionRating = opinion.opinionRating;
    this.allOpinionsRefs.push(componentRef);
  }

  ModifyOpinion(ID: number, ratings: RatingComponent[], text: string): void {
    for (const opinion of this.allOpinions) {
      if(opinion.ID == ID) {
        opinion.ratings = ratings;
        opinion.review.SetReview(text);
      }
    }
  }

  DeleteOpinion(ID: number): boolean {
    //todo: remove from database
    for (let i = 0; i < this.allOpinions.length; i++) {
      // TODO: may be problematic if sorting gets implemented
      if(this.allOpinions[i].ID == ID) {
        this.allOpinions.splice(i, 1);
        this.opinionHost.viewContainerRef.get(i)?.destroy();
        this.allOpinionsRefs.splice(i, 1);
      }
    }
    return true;
  }
}
