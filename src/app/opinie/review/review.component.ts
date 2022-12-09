import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  text : string;

  constructor() {
    this.text = "bardzo fajny produkt polecam cieplutko i blabla bla bla bla blabla bla bla bla blabla bla bla bla" +
      "blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla" +
      "blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla" +
      " blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla bla blabla bla bla blablabla bla bla bla";
  }

  ngOnInit(): void {
  }

  GetReview() : string { return this.text; }

  SetReview(newText : string) { this.text = newText; }

}
