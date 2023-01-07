import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktWidokComponent } from './kategoria-widok.component';

describe('ProduktComponent', () => {
  let component: ProduktWidokComponent;
  let fixture: ComponentFixture<ProduktWidokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktWidokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktWidokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});