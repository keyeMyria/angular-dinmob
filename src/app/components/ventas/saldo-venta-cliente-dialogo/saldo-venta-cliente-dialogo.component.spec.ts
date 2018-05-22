import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoVentaClienteDialogoComponent } from './saldo-venta-cliente-dialogo.component';

describe('SaldoVentaClienteDialogoComponent', () => {
  let component: SaldoVentaClienteDialogoComponent;
  let fixture: ComponentFixture<SaldoVentaClienteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoVentaClienteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoVentaClienteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
