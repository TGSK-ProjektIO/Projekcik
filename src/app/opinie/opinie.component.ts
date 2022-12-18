import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {OpinionCreatorHostDirective, OpinionHostDirective} from "./opinion-host.directive";
import {OpinionCreatorComponent} from "./opinion-creator/opinion-creator.component";
import {Opinion} from "../../../express-backend-api/model/opinion";
import {OpinionRating} from "../../../express-backend-api/model/opinion.rating";
import {Rating} from "../../../express-backend-api/model/rating";
import {Profile} from "../../../express-backend-api/model/profile";
import {OpinionRatingState} from "./opinion-rating/opinion-rating.component";
import {Session} from "../../../express-backend-api/model/session";
import {User} from "../../../express-backend-api/model/user";


// TODO: get user type from session
export enum UserType { anon, logged, admin}
export enum PageType { product, profile}

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {
  // TODO: get user type and ID from session
  userType : UserType = UserType.logged;
  userLogged : Profile;
  isUserType(type : UserType) : boolean {
    return this.userType === type;
  }
  // Get productID from product/profile
  @Input() id = "4";
  // TODO: get product attributes from product
  productAttributes : string[] = ["fajno", "niefajno", "zajefajno", "wydajność"];

  @Input() pageType : PageType = PageType.profile;
  allOpinions : CompleteOpinionComponent[] = [];
  allOpinionsRefs : CompleteOpinionComponent[] = [];
  opinionCreator : OpinionCreatorComponent = new OpinionCreatorComponent(this);
  @ViewChild(OpinionHostDirective, {static: true}) opinionHost!: OpinionHostDirective;
  @ViewChild(OpinionCreatorHostDirective, {static: true}) opinionCreatorHost!: OpinionCreatorHostDirective;

  constructor() {
    this.userLogged = {
      userId: "6669",
      nickname: "Verified User",
      profilePicture: "https://i.imgur.com/tYkCX47.jpg",
      description: "",
      isBanned: false
    }
  }

  ngOnInit(): void {
    switch (this.pageType) {
      case PageType.product:
        this.RetrieveAndSetupOpinions(this.DB_GetOpinionsByProduct, "2", true); break;
      case PageType.profile: this.RetrieveAndSetupOpinions(this.DB_GetOpinionsByUser); break;
      default: break;
    }
  }

  RetrieveAndSetupOpinions(getOpinionsFunction : (id:string) => Promise<Opinion[]>,
                           parameterID?: string,
                           addOpinionCreator?: boolean) {
    let sessionId = localStorage.getItem('sessionId');
    if(sessionId === null) sessionId = "63989e1487aeaea885478453";

    // Database calls order:
    // SESSION > USERS > OPINIONS > PROFILES

    // Get session [needed to retrieve userType and userLoggedID info]
    // ---------------------------------------------------------------
    this.DB_GetSessionByID(sessionId)
    .then(userSession => {
      this.userLogged.userId = userSession.userId.toString();
    }).then(() => this.DB_GetUserByID(this.userLogged.userId)

    // Set user type
    // -------------
    ).then(userLogged => {
      if(userLogged.isAdministrator) this.userType = UserType.admin;
      else this.userType = UserType.logged;

    // Get logged user profile
    // -----------------------
    }).then(() => {
      return this.DB_GetProfileByID(this.userLogged.userId);
    }).then(profile => { this.userLogged = profile;

    // Init opinion creator
    // --------------------
    }).then(() => {
      if(addOpinionCreator && this.userType == UserType.logged) {
        this.opinionCreator = this.opinionCreatorHost.viewContainerRef.createComponent<OpinionCreatorComponent>(OpinionCreatorComponent).instance;
        this.opinionCreator.parent = this;
        this.opinionCreator.AddRatings(this.productAttributes);
      }

    // Get user opinions
    // -----------------
    }).then(() => getOpinionsFunction(parameterID || this.userLogged.userId)
    ).then(opinionList => {
      for (const opinion of opinionList) {
        this.allOpinions.push(this.OpinionDBToComponent(opinion));
      }

    // Get user nickname & picture from profile, attach them to opinion
    //  and show it
    // ----------------------------------------------------------------
    }).then(() => {
      for (const opinion of this.allOpinions) {
        this.DB_GetProfileByID(opinion.userID).then(userProfile => {
          opinion.userName = userProfile.nickname;
          opinion.userPicture = userProfile.profilePicture;
          this.ShowOpinion(opinion)
        });
      }
    });
  }

  CreateOpinion(newOpinion : CompleteOpinionComponent): void {
    newOpinion.userID = this.userLogged.userId;
    newOpinion.productID = this.id;
    newOpinion.canEdit = true;

    this.DB_CreateOpinion(this.OpinionComponentToDB(newOpinion)).then(success => {
      if(success) {
        this.allOpinions.unshift(newOpinion);
        this.ShowOpinion(newOpinion, 0);
      }
    });
  }

  private ShowOpinion(opinion : CompleteOpinionComponent, index: number = this.allOpinionsRefs.length) {
    const componentRef = this.opinionHost.viewContainerRef.createComponent<CompleteOpinionComponent>(CompleteOpinionComponent, {index: index}).instance;
    componentRef.SetParent(this);
    componentRef.canEdit = opinion.canEdit;
    componentRef.ID = opinion.ID;
    componentRef.userID = opinion.userID;
    componentRef.productID = opinion.productID;
    componentRef.review = opinion.review;
    componentRef.ratings = opinion.ratings;
    componentRef.opinionRating = opinion.opinionRating;
    componentRef.userName = opinion.userName;
    componentRef.userPicture = opinion.userPicture;
    this.allOpinionsRefs.push(componentRef);
  }

  ModifyOpinion(opinion : CompleteOpinionComponent): void {
    //TODO: likes dont work
    this.DB_GetOpinionByID(opinion.ID).then(res => {
      res.review = { userID: opinion.userID, text: opinion.review.text };
      let ratings: Array<Rating> = new Array<Rating>();
      for (const rating of opinion.ratings) {
        ratings.push({userID: res.userId, name: rating.name, rating: rating.rating});
      }
      res.ratings = ratings;

      let foundUser = false;
      for (const opinionRating of res.opinionRatings) {
        if(opinionRating.userID == this.userLogged.userId) {
          switch(opinion.opinionRating.ratingState) {
            case OpinionRatingState.Liked: opinionRating.like++; break;
            case OpinionRatingState.Disliked: opinionRating.dislike++; break;
          }
          foundUser = true;
          break;
        }
      }
      if(!foundUser)
        res.opinionRatings.push(
          {userID: this.userLogged.userId,
            like: opinion.opinionRating.likes,
            dislike: opinion.opinionRating.dislikes});
      this.DB_ModifyOpinion(res);
    });
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
    //todo: populate list
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
    opinionComponent.productID = opinion.productId;
    opinionComponent.review.SetParent(opinionComponent);
    opinionComponent.review.text = opinion.review.text;
    for (const rating of opinion.ratings) {
      opinionComponent.AddRating(rating.name, rating.rating);
    }
    let likes = 0, dislikes = 0, ratingState = OpinionRatingState.None;
    for (const opinionRating of opinion.opinionRatings) {
      dislikes += opinionRating.dislike;
      likes += opinionRating.like;
      if(opinionRating.userID == opinion.userId) {
        if(opinionRating.like >=1)
          opinionComponent.opinionRating.ratingState = OpinionRatingState.Liked
        else if((opinionRating.dislike >=1))
          opinionComponent.opinionRating.ratingState = OpinionRatingState.Disliked
      }
    }
    opinionComponent.opinionRating.likes = likes;
    opinionComponent.opinionRating.dislikes = dislikes;
    opinionComponent.opinionRating.ratingState = ratingState;

    opinionComponent.canEdit = (this.isUserType(UserType.logged) &&
                                this.userLogged.userId === opinion.userId);
    return opinionComponent;
  }
  //endregion

  // region Database functions
  // ------------------

  // region Opinion API
  // ------------------
  private async DB_CreateOpinion(opinion: Opinion): Promise<boolean> {
    console.log(opinion);
    let success: boolean;
    return await fetch(`http://localhost:3000/api/v1/opinie/add`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(opinion)
    }).then(async response => {

      if (response.status === 201) { success = true; }
      if (response.status === 400) { success = false; }
    }).then(() => {return success});
  }

  private DB_ModifyOpinion(opinion: Opinion) {
    fetch(`http://localhost:3000/api/v1/opinie/modify`, {
      method: 'PUT',
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

  private async DB_GetOpinionsByUser(userID: string): Promise<Array<Opinion>> {
    return await fetch(`http://localhost:3000/api/v1/opinie/getByUser/${userID}`, {
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

  private async DB_GetOpinionByID(id: string): Promise<Opinion> {
    return await fetch(`http://localhost:3000/api/v1/opinie/get/${id}`, {
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
  //endregion

  // region UserProfile API
  // ----------------------
  private async DB_GetProfileByID(userID: string): Promise<Profile> {
    return await fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/getProfileByUserId/${userID}`, {
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
  //endregion

  // region Session/User API
  // ------------------
  private async DB_GetSessionByID(sessionID: string | undefined): Promise<Session> {
    return await fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/session/${sessionID}`, {
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
  private async DB_GetUserByID(userID: string): Promise<User> {
    return await fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/user/${userID}`, {
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
  //endregion

  //endregion
}
