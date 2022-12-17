import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktListaComponent } from './produkt-lista.component';

describe('ProduktComponent', () => {
  let component: ProduktListaComponent;
  let fixture: ComponentFixture<ProduktListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});