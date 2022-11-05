import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestieIZgloszeniaComponent } from './sugestie-i-zgloszenia.component';

describe('SugestieIZgloszeniaComponent', () => {
  let component: SugestieIZgloszeniaComponent;
  let fixture: ComponentFixture<SugestieIZgloszeniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugestieIZgloszeniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugestieIZgloszeniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
