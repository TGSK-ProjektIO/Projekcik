import {Component, Input, OnInit} from '@angular/core';
import {CompleteOpinionComponent} from "../complete-opinion/complete-opinion.component";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() text : string = "";
  @Input() isReadonly = true;
  parent: CompleteOpinionComponent | undefined;

  constructor() { }
  ngOnInit(): void { }

  SetParent(newParent : CompleteOpinionComponent) { this.parent = newParent; }

  GetReview() : string { return this.text; }

  SetReview(newText : string) { this.text = newText; }
}
