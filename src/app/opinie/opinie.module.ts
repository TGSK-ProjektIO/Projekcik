import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpinieComponent } from './opinie.component';
import { ReviewComponent } from './review/review.component';
import { RatingComponent } from './rating/rating.component';
import { OpinionRatingComponent } from './opinion-rating/opinion-rating.component';
import { RatingModule } from "ngx-bootstrap/rating";
import { FormsModule } from "@angular/forms";
import { CompleteOpinionComponent } from "./complete-opinion/complete-opinion.component";
import { OpinionHostDirective } from './opinion-host.directive';
import { OpinionCreatorComponent } from "./opinion-creator/opinion-creator.component";



@NgModule({
  declarations: [
    OpinieComponent,
    ReviewComponent,
    RatingComponent,
    OpinionRatingComponent,
    CompleteOpinionComponent,
    OpinionHostDirective,
    OpinionCreatorComponent
  ],
  exports: [
    OpinieComponent,
    CompleteOpinionComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    FormsModule
  ]
})
export class OpinieModule {

}
