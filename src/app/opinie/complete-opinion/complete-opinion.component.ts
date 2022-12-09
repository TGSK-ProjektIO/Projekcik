import {Component, Input, OnInit, Type} from '@angular/core';
import {OpinionRatingComponent} from "../opinion-rating/opinion-rating.component";
import {RatingComponent} from "../rating/rating.component";
import {ReviewComponent} from "../review/review.component";

// TODO: get user type from session
enum UserType { anon, logged, admin}

@Component({
  selector: 'app-complete-opinion',
  templateUrl: './complete-opinion.component.html',
  styleUrls: ['./complete-opinion.component.css']
})
export class CompleteOpinionComponent implements OnInit {
  userType : UserType = UserType.anon;
  UserTypes = UserType;
  // Needed to pull [[ opinions ]] from database that are assigned to [[ product ]]
  @Input() productID : string = "";
  // Needed to identify singular [[ opinion ]]
  @Input() ID : number = 0;
  // Needed to assign [[ user ]] to [[ opinion ]]
  @Input() userID : string = "";


  opinionRating : OpinionRatingComponent = new OpinionRatingComponent;
  review : ReviewComponent = new ReviewComponent;
  ratings : Array<RatingComponent> = [];

  constructor() {
    // for (let i = 0; i < 15; i++) {
    //   this.SetRating("rating"+i, 3);
    // }
    // this.SetReview("bardzo fajny produkt polecam cieplutkoooooooo o o o\
    //   ooooooo oooooooooo ooooooo oooooooo oooooooo oooooooooooooo ooooo oooooooooo ooooo oo\
    //   oooo ooo ooo ooooo ooooo ooooo ooo ooo oooooooooo ooo ooo oo\
    //   ooooooo oooooooooo ooooooo oooooooo oooooooo oooooooooooooo ooooo oooooooooo ooooo oo\
    //   oooo ooo ooo ooooo ooooo ooooo ooo ooo oooooooooo ooo ooo oo\
    //   ooooooo oooooooooo ooooooo oooooooo oooooooo oooooooooooooo ooooo oooooooooo ooooo oo\
    //   oooo ooo ooo ooooo ooooo ooooo ooo ooo oooooooooo ooo ooo oo\
    //   ooooooo oooooooooo ooooooo oooooooo oooooooo oooooooooooooo ooooo oooooooooo ooooo oo\
    //   oooo ooo ooo ooooo ooooo ooooo ooo ooo oooooooooo ooo ooo oo");
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
  SetReview(text : string) : void {
    this.review.SetReview(text);
    this.review.ngOnInit();
  }
  SetRating(name : string, value : number) : void {
    let newRating: RatingComponent = new RatingComponent;
    newRating.name = name;
    newRating.rating = value;
    this.ratings.push(newRating);
  }
}
