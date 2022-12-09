import {Component, Input, OnInit} from '@angular/core';
import {OpinionRatingComponent} from "../opinion-rating/opinion-rating.component";
import {RatingComponent} from "../rating/rating.component";
import {ReviewComponent} from "../review/review.component";

@Component({
  selector: 'app-complete-opinion',
  templateUrl: './complete-opinion.component.html',
  styleUrls: ['./complete-opinion.component.css']
})
export class CompleteOpinionComponent implements OnInit {
  // Needed to pull [[ opinions ]] from database that are assigned to [[ product ]]
  @Input() productID : string = "";
  // Needed to identify singular [[ opinion ]]
  @Input() ID : number = 0;
  // Needed to assign [[ user ]] to [[ opinion ]]
  @Input() userID : string = "";
  // Attributes that are used to create singular [[ ratings ]]
  @Input() attributes : string[] = [];
  opinionRating : OpinionRatingComponent = new OpinionRatingComponent;
  review : ReviewComponent = new ReviewComponent;
  ratings : Array<RatingComponent> = [];

  constructor() {
    for (let i = 0; i < 15; i++) {
      this.SetRating("rating"+i, 3);
    }
  }

  ngOnInit(): void {
  }

  GetID() : number { return this.ID; }
  GetReview() : string { return this.review.GetReview(); }
  GetMeanRating() : number {
    let result: number = 0;
    for (const rating of this.ratings) {
      result += rating.GetRating();
    }
    return result;
  }
  GetDetailedRatings() : Array<RatingComponent> {
    return this.ratings;
  }
  AddLike() : void { this.opinionRating.ClickedLike(); }
  AddDislike() : void { this.opinionRating.ClickedDislike(); }
  SetReview(text : string) : void { this.review.SetReview(text); }
  SetRating(name : string, value : number) : void {
    let newRating: RatingComponent = new RatingComponent;
    newRating.name = name;
    newRating.rating = value;
    this.ratings.push(newRating);
  }
  // Add new rating in case attribute changed
  UpdateRatings(name : string)  {
    this.attributes.push(name);
    this.SetRating(name, 0);
  }
}
