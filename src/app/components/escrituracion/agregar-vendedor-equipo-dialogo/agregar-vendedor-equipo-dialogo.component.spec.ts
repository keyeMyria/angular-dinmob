import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarVendedorEquipoDialogoComponent } from './agregar-vendedor-equipo-dialogo.component';

describe('AgregarVendedorEquipoDialogoComponent', () => {
  let component: AgregarVendedorEquipoDialogoComponent;
  let fixture: ComponentFixture<AgregarVendedorEquipoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarVendedorEquipoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarVendedorEquipoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
