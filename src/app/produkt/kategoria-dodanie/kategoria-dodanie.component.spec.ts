import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoriaDodanieComponent } from './kategoria-dodanie.component';

describe('KategoriaDodanieComponent', () => {
  let component: KategoriaDodanieComponent;
  let fixture: ComponentFixture<KategoriaDodanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategoriaDodanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategoriaDodanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
