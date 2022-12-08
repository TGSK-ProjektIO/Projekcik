import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinieComponent } from './opinie.component';
import { ReviewComponent } from './review/review.component';
import { RatingComponent } from './rating/rating.component';
import { OpinionRatingComponent } from './opinion-rating/opinion-rating.component';



@NgModule({
  declarations: [
    OpinieComponent,
    ReviewComponent,
    RatingComponent,
    OpinionRatingComponent
  ],
  exports: [
    OpinionRatingComponent,
    RatingComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OpinieModule { }
