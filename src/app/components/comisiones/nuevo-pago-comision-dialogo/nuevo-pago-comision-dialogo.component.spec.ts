import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPagoComisionDialogoComponent } from './nuevo-pago-comision-dialogo.component';

describe('NuevoPagoComisionDialogoComponent', () => {
  let component: NuevoPagoComisionDialogoComponent;
  let fixture: ComponentFixture<NuevoPagoComisionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPagoComisionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPagoComisionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
