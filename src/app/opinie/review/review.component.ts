import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() text : string = "";


  constructor() {
  }

  ngOnInit(): void {
  }

  GetReview() : string { return this.text; }

  SetReview(newText : string) { this.text = newText; }

}
