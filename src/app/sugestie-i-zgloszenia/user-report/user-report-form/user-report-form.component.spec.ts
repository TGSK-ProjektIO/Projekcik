import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportFormComponent } from './user-report-form.component';

describe('UserReportFormComponent', () => {
  let component: UserReportFormComponent;
  let fixture: ComponentFixture<UserReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportFormComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
