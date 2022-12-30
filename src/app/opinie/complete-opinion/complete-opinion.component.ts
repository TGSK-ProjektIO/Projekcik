import {Component, OnInit, ViewChild} from '@angular/core';
import {OpinionRatingComponent} from "../opinion-rating/opinion-rating.component";
import {RatingComponent} from "../rating/rating.component";
import {ReviewComponent} from "../review/review.component";
import {OpinieComponent, PageType, UserType} from "../opinie.component";
import {OpinionRatingHostDirective, RatingsHostDirective, ReviewHostDirective} from "../opinion-host.directive";

@Component({
  selector: 'app-complete-opinion',
  templateUrl: './complete-opinion.component.html',
  styleUrls: ['./complete-opinion.component.css']
})
export class CompleteOpinionComponent implements OnInit {
  UserTypes = UserType;
  canEdit : boolean = false;

  // Needed to pull [[ opinions ]] from database that are assigned to [[ product ]]
  productID : string = "";
  // Needed to identify singular [[ opinion ]]
  ID : string = "";
  // Needed to assign [[ user ]] to [[ opinion ]]
  userID : string = "";

  opinionRating : OpinionRatingComponent;
  review : ReviewComponent;
  ratings : Array<RatingComponent> = [];

  @ViewChild(RatingsHostDirective, {static: true}) ratingsHost!: RatingsHostDirective;
  @ViewChild(ReviewHostDirective, {static: true}) reviewHost!: ReviewHostDirective;
  @ViewChild(OpinionRatingHostDirective, {static: true}) opinionRatingHost!: OpinionRatingHostDirective;

  // From UserProfile
  // ----------------
  userName : string = "Verified Customer"
  userPicture : string = "https://i.imgur.com/tYkCX47.jpg"

  //temp
  opinieParent : OpinieComponent = new OpinieComponent();
  SetParent(newParent : OpinieComponent) { this.opinieParent = newParent}

  constructor() {
    this.review = new ReviewComponent();
    this.opinionRating = new OpinionRatingComponent();
  }

  ngOnInit(): void {
    this.SpawnRatings();
    this.SpawnReview();
    this.SpawnOpinionRating();
  }

  //region Spawners
  SpawnRatings() {
    for (let rating of this.ratings) {
      let ratingRef = this.ratingsHost.viewContainerRef.createComponent<RatingComponent>(RatingComponent).instance;
      ratingRef.SetParent(this);
      ratingRef.rating = rating.rating;
      ratingRef.name = rating.name;
      ratingRef.isReadonly = !this.canEdit;
      rating = ratingRef;
    }
  }

  SpawnReview() {
    let reviewRef = this.reviewHost.viewContainerRef.createComponent<ReviewComponent>(ReviewComponent).instance;
    reviewRef.text = this.review.text;
    reviewRef.isReadonly = !this.canEdit;
    reviewRef.SetParent(this);
    this.review = reviewRef;
  }

  SpawnOpinionRating() {
    let opinionRatingRef = this.opinionRatingHost.viewContainerRef.createComponent<OpinionRatingComponent>(OpinionRatingComponent).instance;
    opinionRatingRef.ratingState = this.opinionRating.ratingState;
    opinionRatingRef.isReadonly = this.canEdit || !this.opinieParent.isUserType(UserType.logged);
    opinionRatingRef.likes = this.opinionRating.likes;
    opinionRatingRef.dislikes = this.opinionRating.dislikes;
    opinionRatingRef.SetParent(this);
    this.opinionRating = opinionRatingRef;
  }
  //endregion

  ShowID(): string {
    switch (this.opinieParent.pageType) {
      case PageType.product: return "@" + this.userID;
      case PageType.profile: return "@" + this.productID;
    }
  }

  GetMeanRating() : number {
    let result: number = 0;
    for (const rating of this.ratings) {
      result += rating.GetRating();
    }
    return result;
  }

  AddRating(name : string, value : number) : void {
    let newRating: RatingComponent = new RatingComponent();
    newRating.name = name;
    newRating.rating = value;
    newRating.isReadonly = !this.canEdit;
    this.ratings.push(newRating);
  }

  DestroyOpinion() : void {
    this.opinieParent.DeleteOpinion(this.ID);
  }

  public ApplyModifiedOpinion() { this.opinieParent.ModifyOpinion(this); }
  //TODO: why tf binding doesnt work and I have to resort to this monstrosity
  public ModifyRating(name : string, value : number) {
    for (let rating of this.ratings)
      if(rating.name == name) { rating.rating = value; break; }
  }
  public LikeOpinion() { this.opinieParent.LikeOpinion(this); }
  public DislikeOpinion() { this.opinieParent.DislikeOpinion(this); }
}
