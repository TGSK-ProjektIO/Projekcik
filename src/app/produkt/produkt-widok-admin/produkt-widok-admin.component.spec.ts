import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktWidokAdminComponent } from './produkt-widok-admin.component';

describe('ProduktComponent', () => {
  let component: ProduktWidokAdminComponent;
  let fixture: ComponentFixture<ProduktWidokAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktWidokAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktWidokAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
