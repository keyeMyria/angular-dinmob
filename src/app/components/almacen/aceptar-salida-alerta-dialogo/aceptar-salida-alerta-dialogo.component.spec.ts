import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptarSalidaAlertaDialogoComponent } from './aceptar-salida-alerta-dialogo.component';

describe('AceptarSalidaAlertaDialogoComponent', () => {
  let component: AceptarSalidaAlertaDialogoComponent;
  let fixture: ComponentFixture<AceptarSalidaAlertaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptarSalidaAlertaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptarSalidaAlertaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
