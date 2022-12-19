import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyszukajProduktLubProfilComponent } from './wyszukaj-produkt-lub-profil.component';

describe('WyszukajProduktLubProfilComponent', () => {
  let component: WyszukajProduktLubProfilComponent;
  let fixture: ComponentFixture<WyszukajProduktLubProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyszukajProduktLubProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyszukajProduktLubProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
