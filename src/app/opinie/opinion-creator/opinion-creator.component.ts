import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ReviewComponent} from "../review/review.component";
import {OpinieComponent} from "../opinie.component";
import {RatingComponent} from "../rating/rating.component";
import {OpinionHostDirective} from "../opinion-host.directive";
import {CompleteOpinionComponent} from "../complete-opinion/complete-opinion.component";

@Component({
  selector: 'app-opinion-creator',
  templateUrl: './opinion-creator.component.html',
  styleUrls: ['./opinion-creator.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OpinionCreatorComponent implements AfterViewInit {

  ratings : RatingComponent[] = [];
  // @ts-ignore
  review : ReviewComponent = new ReviewComponent();

  @ViewChild(OpinionHostDirective, {static: true}) ratingsHost!: OpinionHostDirective;
  parent : OpinieComponent;

  constructor(parent : OpinieComponent) {
    this.parent = parent;
  }

  ngAfterViewInit(): void {
    this.review = this.ratingsHost.viewContainerRef.createComponent<ReviewComponent>(ReviewComponent).instance;
    this.review.isReadonly = false;
  }

  AddRatings(ratingsList : string[]) : void {
    for (const ratingName of ratingsList) {
      const componentRef = this.ratingsHost.viewContainerRef.createComponent<RatingComponent>(RatingComponent).instance;
      componentRef.name = ratingName;
      componentRef.isReadonly = false;
      componentRef.parent = this;
      this.ratings.push(componentRef);
    }
  }

  public ModifyRating(name : string, value : number) {
    console.log(this.ratings);
    // for (let rating of this.ratings) {
    //   if(rating.name == name) { rating.rating = value; break; }
    // }
  }

  CreateOpinion() : void {
    let newOpinion = new CompleteOpinionComponent();
    newOpinion.userID = this.parent.userLogged.userId;
    newOpinion.userName = this.parent.userLogged.nickname;
    newOpinion.userPicture = this.parent.userLogged.profilePicture;
    newOpinion.review.text = this.review.text;
    for (const rating of this.ratings) {
      let ratingCopy = Object.assign({}, rating);
      newOpinion.ratings.push(ratingCopy);
    }
    this.parent.CreateOpinion(newOpinion);

    // clear fields
    this.review.SetReview("");
    for (const rating of this.ratings) {
      rating.rating = 0;
    }
  }
}
