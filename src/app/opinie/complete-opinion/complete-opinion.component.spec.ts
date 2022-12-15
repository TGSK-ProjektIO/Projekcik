import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteOpinionComponent } from './complete-opinion.component';

describe('CompleteOpinionComponent', () => {
  let component: CompleteOpinionComponent;
  let fixture: ComponentFixture<CompleteOpinionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteOpinionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteOpinionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
