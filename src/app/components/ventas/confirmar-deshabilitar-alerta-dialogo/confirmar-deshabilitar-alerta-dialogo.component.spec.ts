import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarDeshabilitarAlertaDialogoComponent } from './confirmar-deshabilitar-alerta-dialogo.component';

describe('ConfirmarDeshabilitarAlertaDialogoComponent', () => {
  let component: ConfirmarDeshabilitarAlertaDialogoComponent;
  let fixture: ComponentFixture<ConfirmarDeshabilitarAlertaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarDeshabilitarAlertaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarDeshabilitarAlertaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
