import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriaModyfikacjaComponent } from './kategoria-modyfikacja.component';

describe('KategoriaModyfikacjaComponent', () => {
  let component: KategoriaModyfikacjaComponent;
  let fixture: ComponentFixture<KategoriaModyfikacjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategoriaModyfikacjaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriaModyfikacjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
