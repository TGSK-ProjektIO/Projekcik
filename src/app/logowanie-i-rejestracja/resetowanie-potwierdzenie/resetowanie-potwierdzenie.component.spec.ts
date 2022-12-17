import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetowaniePotwierdzenieComponent } from './resetowanie-potwierdzenie.component';

describe('ResetowaniePotwierdzenieComponent', () => {
  let component: ResetowaniePotwierdzenieComponent;
  let fixture: ComponentFixture<ResetowaniePotwierdzenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetowaniePotwierdzenieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetowaniePotwierdzenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
