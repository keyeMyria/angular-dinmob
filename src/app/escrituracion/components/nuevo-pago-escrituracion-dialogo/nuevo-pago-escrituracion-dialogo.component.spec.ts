import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPagoEscrituracionDialogoComponent } from './nuevo-pago-escrituracion-dialogo.component';

describe('NuevoPagoEscrituracionDialogoComponent', () => {
  let component: NuevoPagoEscrituracionDialogoComponent;
  let fixture: ComponentFixture<NuevoPagoEscrituracionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPagoEscrituracionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPagoEscrituracionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
