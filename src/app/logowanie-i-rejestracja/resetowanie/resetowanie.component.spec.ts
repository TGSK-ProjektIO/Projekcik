import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetowanieComponent } from './resetowanie.component';

describe('ResetowanieComponent', () => {
  let component: ResetowanieComponent;
  let fixture: ComponentFixture<ResetowanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetowanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetowanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
