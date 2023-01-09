import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReportsAdminComponent } from './all-reports-admin.component';

describe('AllReportsAdminComponent', () => {
  let component: AllReportsAdminComponent;
  let fixture: ComponentFixture<AllReportsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllReportsAdminComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllReportsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
