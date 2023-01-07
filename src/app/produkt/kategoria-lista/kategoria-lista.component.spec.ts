import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriaListaComponent } from './kategoria-lista.component';

describe('KategoriaListaComponent', () => {
  let component: KategoriaListaComponent;
  let fixture: ComponentFixture<KategoriaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategoriaListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});