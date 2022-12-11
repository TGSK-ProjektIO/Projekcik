import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() name: string = "";
  @Input() rating: number = 0;
  @Input() isReadonly = true;

  constructor() { }

  ngOnInit(): void {
  }

  GetRating(): number {
    return this.rating;
  }

  GetName(): string {
    return this.name;
  }

  SetRating(rating: number): void {
    this.rating = rating;
  }

}
