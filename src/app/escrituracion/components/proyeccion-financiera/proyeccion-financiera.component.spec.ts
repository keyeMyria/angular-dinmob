import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyeccionFinancieraComponent } from './proyeccion-financiera.component';

describe('ProyeccionFinancieraComponent', () => {
  let component: ProyeccionFinancieraComponent;
  let fixture: ComponentFixture<ProyeccionFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyeccionFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyeccionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
