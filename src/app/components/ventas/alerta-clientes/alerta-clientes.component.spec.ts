import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaClientesComponent } from './alerta-clientes.component';

describe('AlertaClientesComponent', () => {
  let component: AlertaClientesComponent;
  let fixture: ComponentFixture<AlertaClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
