import {Component, OnInit, ViewChild} from '@angular/core';
import {ReviewComponent} from "../review/review.component";
import {OpinieComponent} from "../opinie.component";
import {RatingComponent} from "../rating/rating.component";
import {OpinionHostDirective} from "../opinion-host.directive";
import {CompleteOpinionComponent} from "../complete-opinion/complete-opinion.component";

@Component({
  selector: 'app-opinion-creator',
  templateUrl: './opinion-creator.component.html',
  styleUrls: ['./opinion-creator.component.css']
})
export class OpinionCreatorComponent implements OnInit {
  ratings : RatingComponent[] = [];
  review : ReviewComponent = new ReviewComponent();

  @ViewChild(OpinionHostDirective, {static: true}) ratingsHost!: OpinionHostDirective;
  parent : OpinieComponent;

  constructor(parent : OpinieComponent) {
    this.parent = parent;
  }

  ngOnInit(): void {
    this.review = this.ratingsHost.viewContainerRef.createComponent<ReviewComponent>(ReviewComponent).instance;
    this.review.isReadonly = false;
  }

  AddRatings(ratingsList : string[]) : void {
    for (const ratingName of ratingsList) {
      const componentRef = this.ratingsHost.viewContainerRef.createComponent<RatingComponent>(RatingComponent).instance;
      componentRef.name = ratingName;
      componentRef.isReadonly = false;
      this.ratings.push(componentRef);
    }
  }

  CreateOpinion() : void {
    let newOpinion = new CompleteOpinionComponent();
    newOpinion.review.text = this.review.GetReview();
    newOpinion.ratings = this.ratings;
    this.parent.CreateOpinion(newOpinion);
  }
}
