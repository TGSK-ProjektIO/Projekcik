import { Component, OnInit } from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {RatingComponent} from "./rating/rating.component";

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {

  allOpinions : CompleteOpinionComponent[] = [];

  constructor() { }

  ngOnInit(): void {
    this.GetAllOpinions();
  }

  CreateOpinion(ID: number, attributes: string[]): void {

  }

  GetOpinion(ID: number): CompleteOpinionComponent {
    return new CompleteOpinionComponent();
  }

  public GetAllOpinions(): void {
    let opinions : CompleteOpinionComponent[] = [];
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    opinions.push(new CompleteOpinionComponent());
    this.allOpinions = opinions;
  }

  ModifyOpinion(ID: number, ratings: RatingComponent[], text: string): void {

  }

  DeleteOpinion(ID: number): boolean {
    return true;
  }
}
