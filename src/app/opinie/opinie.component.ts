import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CompleteOpinionComponent} from "./complete-opinion/complete-opinion.component";
import {RatingComponent} from "./rating/rating.component";
import {OpinionHostDirective} from "./opinion-host.directive";
import {OpinionRatingComponent} from "./opinion-rating/opinion-rating.component";

@Component({
  selector: 'app-opinie',
  templateUrl: './opinie.component.html',
  styleUrls: ['./opinie.component.css']
})
export class OpinieComponent implements OnInit {

  allOpinions : CompleteOpinionComponent[] = [];
  @ViewChild(OpinionHostDirective, {static: true}) opinionHost!: OpinionHostDirective;

  constructor() { }

  ngOnInit(): void {
    // =======================================
    //                 TEMP
    //  TODO: replace with getting data from database
    let opinions : CompleteOpinionComponent[] = [];
    for (let i = 0; i < 10; i++) {
      let opinion = new CompleteOpinionComponent();
      opinion.SetReview("AAAAAAAAAAAAAAAAAAAAAAA");
      opinion.SetRating("fajno", 4);
      opinion.SetRating("niefajno", 1);
      opinion.SetRating("zajefajno", 5);
      opinion.SetRating("wydajność", 1);
      opinion.opinionRating.likes = 10;
      opinion.opinionRating.dislikes = 2;
      opinions.push(opinion);
    }
    this.allOpinions = opinions;
    // =======================================

    this.GetAllOpinions();
  }

  CreateOpinion(ID: number, attributes: string[]): void {

  }

  GetOpinion(ID: number): CompleteOpinionComponent {
    return new CompleteOpinionComponent();
  }

  public GetAllOpinions(): void {
    const viewContainerRef = this.opinionHost.viewContainerRef;
    viewContainerRef.clear();

    //todo: save refs to some array maybe
    for (const opinion of this.allOpinions) {
      const componentRef = viewContainerRef.createComponent<CompleteOpinionComponent>(CompleteOpinionComponent).instance;
      componentRef.ID = opinion.ID;
      componentRef.review = opinion.review;
      componentRef.ratings = opinion.ratings;
      componentRef.opinionRating = opinion.opinionRating;
    }
  }

  ModifyOpinion(ID: number, ratings: RatingComponent[], text: string): void {
    for (const opinion of this.allOpinions) {
      if(opinion.ID == ID) {
        opinion.ratings = ratings;
        opinion.review.SetReview(text);
      }
    }
  }

  DeleteOpinion(ID: number): boolean {
    return true;
  }
}
