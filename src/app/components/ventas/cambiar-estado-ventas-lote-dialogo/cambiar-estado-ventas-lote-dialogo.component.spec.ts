import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstadoVentasLoteDialogoComponent } from './cambiar-estado-ventas-lote-dialogo.component';

describe('CambiarEstadoVentasLoteDialogoComponent', () => {
  let component: CambiarEstadoVentasLoteDialogoComponent;
  let fixture: ComponentFixture<CambiarEstadoVentasLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarEstadoVentasLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarEstadoVentasLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
