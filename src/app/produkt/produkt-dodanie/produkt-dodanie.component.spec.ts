import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktDodanieComponent } from './produkt-dodanie.component';

describe('ProduktDodanieComponent', () => {
  let component: ProduktDodanieComponent;
  let fixture: ComponentFixture<ProduktDodanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktDodanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktDodanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
