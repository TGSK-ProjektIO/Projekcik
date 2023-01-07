import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriaWidokComponent } from './kategoria-widok.component';

describe('KategoriaWidokComponent', () => {
  let component: KategoriaWidokComponent;
  let fixture: ComponentFixture<KategoriaWidokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategoriaWidokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriaWidokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});