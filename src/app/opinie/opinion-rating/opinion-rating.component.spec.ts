import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionRatingComponent } from './opinion-rating.component';

describe('OpinionRatingComponent', () => {
  let component: OpinionRatingComponent;
  let fixture: ComponentFixture<OpinionRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
