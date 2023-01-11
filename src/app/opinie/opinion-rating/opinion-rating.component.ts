import {Component, Input, OnInit} from '@angular/core';
import {CompleteOpinionComponent} from "../complete-opinion/complete-opinion.component";

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
  parent : CompleteOpinionComponent;

  constructor() {}
  ngOnInit(): void {}

  SetParent(newParent : CompleteOpinionComponent) { this.parent = newParent}

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
    this.parent.LikeOpinion();
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
    this.parent.DislikeOpinion();
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

  isLiked() : boolean {
    return this.ratingState == OpinionRatingState.Liked;
  }
  isDisliked() : boolean {
    return this.ratingState == OpinionRatingState.Disliked;
  }
}
