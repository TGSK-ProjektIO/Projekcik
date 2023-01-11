import { Component, OnInit, Input } from '@angular/core';
import {CompleteOpinionComponent} from "../complete-opinion/complete-opinion.component";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']

})
export class RatingComponent implements OnInit {

  @Input() name: string = "";
  @Input() rating: number = 0;
  @Input() isReadonly = true;
  parent : CompleteOpinionComponent | undefined;

  constructor() { }

  ngOnInit(): void { }

  SetParent(newParent : CompleteOpinionComponent) { this.parent = newParent; }

  GetRating(): number {
    return this.rating;
  }

  GetName(): string {
    return this.name;
  }

  // TODO: fix binding somehow maybe
  OnEdit() { this.parent?.ModifyRating(this.name, this.rating); }

}
