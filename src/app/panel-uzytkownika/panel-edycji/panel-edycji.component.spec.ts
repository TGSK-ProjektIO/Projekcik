import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEdycjiComponent } from './panel-edycji.component';

describe('PanelEdycjiComponent', () => {
  let component: PanelEdycjiComponent;
  let fixture: ComponentFixture<PanelEdycjiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelEdycjiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelEdycjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
