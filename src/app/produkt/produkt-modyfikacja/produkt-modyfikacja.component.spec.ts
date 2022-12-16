import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktModyfikacjaComponent } from './produkt-modyfikacja.component';

describe('ProduktModyfikacjaComponent', () => {
  let component: ProduktModyfikacjaComponent;
  let fixture: ComponentFixture<ProduktModyfikacjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktModyfikacjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktModyfikacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
