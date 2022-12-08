import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-opinion-rating',
  templateUrl: './opinion-rating.component.html',
  styleUrls: ['./opinion-rating.component.css']
})
export class OpinionRatingComponent implements OnInit {
  @Input() likes : number = 0;
  @Input() dislikes : number = 0;

  constructor() {}
  ngOnInit(): void {}

  AddLike() : void { this.likes += 1; }
  AddDislike() : void { this.dislikes += 1; }
  RemoveLike() : void { this.likes -= 1; }
  RemoveDislike() : void { this.dislikes -= 1; }
  GetRating() : string {
    return `This opinion has ${this.likes} likes and ${this.dislikes} dislikes.`
  }
}
