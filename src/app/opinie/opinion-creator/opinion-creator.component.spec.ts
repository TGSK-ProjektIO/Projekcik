import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionCreatorComponent } from './opinion-creator.component';

describe('OpinionCreatorComponent', () => {
  let component: OpinionCreatorComponent;
  let fixture: ComponentFixture<OpinionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
