import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeryfikacjaPotwierdzenieComponent } from './weryfikacja-potwierdzenie.component';

describe('WeryfikacjaPotwierdzenieComponent', () => {
  let component: WeryfikacjaPotwierdzenieComponent;
  let fixture: ComponentFixture<WeryfikacjaPotwierdzenieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeryfikacjaPotwierdzenieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeryfikacjaPotwierdzenieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
