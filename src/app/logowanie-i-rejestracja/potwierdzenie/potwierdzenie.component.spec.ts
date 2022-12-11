import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotwierdzenieComponent } from './potwierdzenie.component';

describe('PotwierdzenieComponent', () => {
  let component: PotwierdzenieComponent;
  let fixture: ComponentFixture<PotwierdzenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotwierdzenieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotwierdzenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
