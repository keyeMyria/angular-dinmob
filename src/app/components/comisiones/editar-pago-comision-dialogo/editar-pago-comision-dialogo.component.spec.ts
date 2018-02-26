import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPagoComisionDialogoComponent } from './editar-pago-comision-dialogo.component';

describe('EditarPagoComisionDialogoComponent', () => {
  let component: EditarPagoComisionDialogoComponent;
  let fixture: ComponentFixture<EditarPagoComisionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPagoComisionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPagoComisionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
