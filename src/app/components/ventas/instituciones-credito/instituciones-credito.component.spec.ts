import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionesCreditoComponent } from './instituciones-credito.component';

describe('InstitucionesCreditoComponent', () => {
  let component: InstitucionesCreditoComponent;
  let fixture: ComponentFixture<InstitucionesCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionesCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionesCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
