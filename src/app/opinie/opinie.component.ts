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
    this.GetAllOpinions();
  }

  CreateOpinion(ID: number, attributes: string[]): void {

  }

  GetOpinion(ID: number): CompleteOpinionComponent {
    return new CompleteOpinionComponent();
  }

  public GetAllOpinions(): void {
    // temp
    let opinions : CompleteOpinionComponent[] = [];
    for (let i = 0; i < 10; i++) {
      opinions.push(new CompleteOpinionComponent());
    }

    const viewContainerRef = this.opinionHost.viewContainerRef;
    viewContainerRef.clear();

    //todo: save refs to some array maybe
    for (const opinion of opinions) {
      const componentRef = viewContainerRef.createComponent<CompleteOpinionComponent>(CompleteOpinionComponent).instance;
      componentRef.SetReview("AAAAAAAAAAAAAAAAAAAAAAA");
      componentRef.SetRating("fajno", 4);
      componentRef.SetRating("niefajno", 1);
      componentRef.SetRating("zajefajno", 5);
      componentRef.SetRating("wydajność", 1);
      componentRef.opinionRating.likes = 10;
      componentRef.opinionRating.dislikes = 2;
    }

    this.allOpinions = opinions;
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
