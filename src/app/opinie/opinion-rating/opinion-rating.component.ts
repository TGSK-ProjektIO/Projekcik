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
        this.ratingState = OpinionRatingState.Liked;
        break;
      case OpinionRatingState.None:
        this.AddLike();
        this.ratingState = OpinionRatingState.Liked;
        break;
      case OpinionRatingState.Liked:
        this.RemoveLike();
        this.ratingState = OpinionRatingState.None;
        break;
    }
  }

  ClickedDislike() : void {
    switch (this.ratingState) {
      case OpinionRatingState.Liked:
        this.RemoveLike();
        this.AddDislike();
        this.ratingState = OpinionRatingState.Disliked;
        break;
      case OpinionRatingState.None:
        this.AddDislike();
        this.ratingState = OpinionRatingState.Disliked;
        break;
      case OpinionRatingState.Disliked:
        this.RemoveDislike();
        this.ratingState = OpinionRatingState.None;
        break;
    }
  }

  private AddLike() : void { this.likes += 1;  }
  private AddDislike() : void { this.dislikes += 1; }
  private RemoveLike() : void { this.likes -= 1; }
  private RemoveDislike() : void { this.dislikes -= 1; }
  GetRating() : string {
    return `This opinion has ${this.likes} likes and ${this.dislikes} dislikes.`
  }
}
