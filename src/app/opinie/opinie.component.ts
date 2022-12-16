import {Component, OnInit, ViewChild} from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {RatingComponent} from "./rating/rating.component";
import {OpinionHostDirective} from "./opinion-host.directive";
import {OpinionCreatorComponent} from "./opinion-creator/opinion-creator.component";
import {Opinion} from "../../../express-backend-api/model/opinion";
import {OpinionRating} from "../../../express-backend-api/model/opinion.rating";
import {Rating} from "../../../express-backend-api/model/rating";


// TODO: get user type from session
export enum UserType { anon, logged, admin}

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {
  // TODO: get user type from session
  userType : UserType = UserType.logged;
  userLoggedID = "2000";
  isUserType(type : UserType) : boolean {
    return this.userType == type;
  }
  //TODO: get productID from product
  productID = "2";
  // TODO: get product attributes from product
  productAttributes : string[] = ["fajno", "niefajno", "zajefajno", "wydajność"];

  allOpinions : CompleteOpinionComponent[] = [];
  allOpinionsRefs : CompleteOpinionComponent[] = [];
  opinionCreator : OpinionCreatorComponent = new OpinionCreatorComponent(this);
  @ViewChild(OpinionHostDirective, {static: true}) opinionHost!: OpinionHostDirective;

  constructor() {  }

  ngOnInit(): void {
    this.DB_GetOpinionsByProduct(this.productID).then(res => {
      let completeOpinionArray = new Array<CompleteOpinionComponent>();
      res.forEach(obj => {completeOpinionArray.push(this.OpinionDBToComponent(obj))});
      this.ShowAllOpinions(completeOpinionArray);
    });

    // Init opinion creator
    // --------------------
    if(this.userType == UserType.logged) {
      this.opinionCreator = this.opinionHost.viewContainerRef.createComponent<OpinionCreatorComponent>(OpinionCreatorComponent, {index: 0}).instance;
      this.opinionCreator.parent = this;
      this.opinionCreator.AddRatings(this.productAttributes);
    }
  }

  GetProductOpinions(opinionArray : Array<Opinion>) {
    for (const opinion of opinionArray) {
      this.allOpinions.push(this.OpinionDBToComponent(opinion));
    }
  }

  CreateOpinion(newOpinion : CompleteOpinionComponent): void {
    newOpinion.userID = this.userLoggedID;
    newOpinion.productID = this.productID;

    this.DB_CreateOpinion(this.OpinionComponentToDB(newOpinion));

    this.allOpinions.unshift(newOpinion);
    this.ShowOpinion(newOpinion, 1);
  }

  GetOpinion(ID: string): CompleteOpinionComponent | undefined {
    let foundOpinion = this.DB_GetOpinionByID(ID);
    console.log(foundOpinion);
    if(foundOpinion == undefined) return undefined;
    return this.OpinionDBToComponent(foundOpinion);
  }

  /*GetUserOpinions(userID : string) : Array<CompleteOpinionComponent>{
    let opinionComponents : Array<CompleteOpinionComponent> = new Array<CompleteOpinionComponent>();
    let opinionArray : Array<Opinion> = this.DB_GetOpinionsByProduct(this.productID);
    for (const opinion of opinionArray) {
      opinionComponents.push(this.OpinionDBToComponent(opinion));
    }
    return opinionComponents
  }*/

  public ShowAllOpinions(opinionArray : Array<CompleteOpinionComponent>): void {
    //viewContainerRef.clear();
    for (const opinion of opinionArray) {
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

  ModifyOpinion(ID: string, ratings: RatingComponent[], text: string): void {
    for (const opinion of this.allOpinions) {
      if(opinion.ID == ID) {
        opinion.ratings = ratings;
        opinion.review.SetReview(text);
        break;
      }
    }
  }

  DeleteOpinion(ID: string): boolean {
    for (let i = 0; i < this.allOpinions.length; i++) {
      // TODO: may be problematic if sorting gets implemented
      if(this.allOpinions[i].ID == ID) {
        this.DB_DeleteOpinion(ID);
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

  // region Converters
  // ----------
  OpinionComponentToDB(opinion : CompleteOpinionComponent): Opinion {
    let opinionRatingsDB: Array<OpinionRating> = new Array<OpinionRating>();
    let ratingsDB: Array<Rating> = new Array<Rating>();
    for (const rating of opinion.ratings) {
      ratingsDB.push({
        userID: opinion.userID,
        name: rating.name,
        rating: rating.rating
      });
    }

    return {
      userId: opinion.userID,
      productId: opinion.productID,
      opinionRatings: opinionRatingsDB,
      review: {userID: opinion.userID, text: opinion.review.text},
      ratings: ratingsDB
    };
  }

  OpinionDBToComponent(opinion : Opinion) : CompleteOpinionComponent {
    let opinionComponent = new CompleteOpinionComponent();
    opinionComponent.SetParent(this);
    // @ts-ignore
    opinionComponent.ID = opinion._id.toString();
    opinionComponent.userID = opinion.userId;
    opinionComponent.SetReview(opinion.review.text);
    for (const rating of opinion.ratings) {
      opinionComponent.SetRating(rating.name, rating.rating);
    }
    let likes = 0, dislikes = 0;
    for (const opinionRating of opinion.opinionRatings) {
      dislikes += opinionRating.dislike;
      likes += opinionRating.like;
    }
    opinionComponent.opinionRating.likes = likes;
    opinionComponent.opinionRating.dislikes = dislikes;
    return opinionComponent;
  }
  //endregion

  // region Database functions
  // ------------------
  private DB_CreateOpinion(opinion: Opinion) {
    fetch(`http://localhost:3000/api/v1/opinie/add`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opinion)
    }).then(async response => {
      if (response.status === 200) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }
  private DB_DeleteOpinion(id : string) {
    fetch(`http://localhost:3000/api/v1/opinie/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }
  private async DB_GetOpinionsByProduct(productID: string): Promise<Array<Opinion>> {
    return await fetch(`http://localhost:3000/api/v1/opinie/getByProduct/${productID}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
    ).then((result) => {
      return result;
    }).catch(err => {
      console.error(err);
    });
  }

  private DB_GetOpinionByID(id: string): Opinion {
    const opinionPromise = fetch(`http://localhost:3000/api/v1/opinie/get/${id}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
      ).then((result) => {
        return result;
      }).catch(err => {
      console.error(err);
    });

    const getOpinion = () : Array<Opinion> => {
      let opinionArray: Array<Opinion> = new Array<Opinion>();
      opinionPromise.then((data: Opinion) => {
        opinionArray.push(data);
      })
      return opinionArray;
    }

    let opinion = getOpinion();
    console.log(opinion);
    return opinion[0];
  }
  //endregion
}


