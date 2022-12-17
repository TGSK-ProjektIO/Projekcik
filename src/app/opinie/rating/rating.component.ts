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

  constructor(private parent : CompleteOpinionComponent) { }

  ngOnInit(): void {
  }

  SetParent(newParent : CompleteOpinionComponent) { this.parent = newParent; }

  GetRating(): number {
    return this.rating;
  }

  GetName(): string {
    return this.name;
  }

  OnEdit() { this.parent.ModifyRating(this.name, this.rating); }

}
