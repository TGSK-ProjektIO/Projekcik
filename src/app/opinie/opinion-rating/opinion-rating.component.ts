import {Component, Input, OnInit} from '@angular/core';

export enum OpinionRatingState { None, Liked, Disliked }

@Component({
  selector: 'app-opinion-rating',
  templateUrl: './opinion-rating.component.html',
  styleUrls: ['./opinion-rating.component.css']
})
export class OpinionRatingComponent implements OnInit {
  @Input() likes : number = 0;
  @Input() dislikes : number = 0;
  @Input() ratingState : OpinionRatingState = OpinionRatingState.None;
  @Input() isReadonly = true;

  constructor() {}
  ngOnInit(): void {}

  ClickedLike() : void {
    switch (this.ratingState) {
      case OpinionRatingState.Disliked:
        this.RemoveDislike();
        this.AddLike();
        break;
      case OpinionRatingState.None:
        this.AddLike(); break;
      case OpinionRatingState.Liked:
        this.RemoveLike(); break;
    }
  }

  ClickedDislike() : void {
    switch (this.ratingState) {
      case OpinionRatingState.Liked:
        this.RemoveLike();
        this.AddDislike();
        break;
      case OpinionRatingState.None:
        this.AddDislike(); break;
      case OpinionRatingState.Disliked:
        this.RemoveDislike(); break;
    }
  }

  private AddLike() : void {
    this.likes += 1;
    this.ratingState = OpinionRatingState.Liked;
  }
  private AddDislike() : void {
    this.dislikes += 1;
    this.ratingState = OpinionRatingState.Disliked;
  }
  private RemoveLike() : void {
    this.likes -= 1;
    this.ratingState = OpinionRatingState.None;
  }
  private RemoveDislike() : void {
    this.dislikes -= 1;
    this.ratingState = OpinionRatingState.None;
  }
  GetRating() : string {
    return `This opinion has ${this.likes} likes and ${this.dislikes} dislikes.`
  }
}
