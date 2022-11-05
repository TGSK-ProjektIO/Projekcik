import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WyszukiwanieComponent } from './wyszukiwanie.component';

describe('WyszukiwanieComponent', () => {
  let component: WyszukiwanieComponent;
  let fixture: ComponentFixture<WyszukiwanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WyszukiwanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WyszukiwanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
