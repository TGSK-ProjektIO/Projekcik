import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReportsUserComponent } from './all-reports-user.component';

describe('AllReportsUserComponent', () => {
  let component: AllReportsUserComponent;
  let fixture: ComponentFixture<AllReportsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReportsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllReportsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
