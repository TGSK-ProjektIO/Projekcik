import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogowanieIRejestracjaComponent } from './logowanie-i-rejestracja.component';

describe('LogowanieIRejestracjaComponent', () => {
  let component: LogowanieIRejestracjaComponent;
  let fixture: ComponentFixture<LogowanieIRejestracjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogowanieIRejestracjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogowanieIRejestracjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
