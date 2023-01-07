import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktWidokUserComponent } from './produkt-widok-user.component';

describe('ProduktComponent', () => {
  let component: ProduktWidokUserComponent;
  let fixture: ComponentFixture<ProduktWidokUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktWidokUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktWidokUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});