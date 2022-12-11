import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProfiluComponent } from './panel-profilu.component';

describe('PanelProfiluComponent', () => {
  let component: PanelProfiluComponent;
  let fixture: ComponentFixture<PanelProfiluComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelProfiluComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelProfiluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
