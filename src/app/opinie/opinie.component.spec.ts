import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinieComponent } from './opinie.component';

describe('OpinieComponent', () => {
  let component: OpinieComponent;
  let fixture: ComponentFixture<OpinieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
