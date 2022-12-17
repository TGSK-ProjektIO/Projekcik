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

  constructor(private parent: CompleteOpinionComponent) { }
  ngOnInit(): void { }

  GetReview() : string { return this.text; }

  SetReview(newText : string) { this.text = newText; }
  OnModify() { this.parent.ModifyOpinion(); }
}
