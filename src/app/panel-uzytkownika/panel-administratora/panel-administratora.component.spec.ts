import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministratoraComponent } from './panel-administratora.component';

describe('PanelAdministratoraComponent', () => {
  let component: PanelAdministratoraComponent;
  let fixture: ComponentFixture<PanelAdministratoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdministratoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAdministratoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
