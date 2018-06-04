import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPagoTrabajadorDialogoComponent } from './editar-pago-trabajador-dialogo.component';

describe('EditarPagoTrabajadorDialogoComponent', () => {
  let component: EditarPagoTrabajadorDialogoComponent;
  let fixture: ComponentFixture<EditarPagoTrabajadorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPagoTrabajadorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPagoTrabajadorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
