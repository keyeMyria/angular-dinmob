import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesPendientesComponent } from './devoluciones-pendientes.component';

describe('DevolucionesPendientesComponent', () => {
  let component: DevolucionesPendientesComponent;
  let fixture: ComponentFixture<DevolucionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
