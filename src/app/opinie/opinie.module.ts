import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinieComponent } from './opinie.component';
import { ReviewComponent } from './review/review.component';
import { OpinionRatingComponent } from './opinion-rating/opinion-rating.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    OpinieComponent,
    ReviewComponent,
    OpinionRatingComponent,
    RatingComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OpinieModule { }
