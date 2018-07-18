import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCargoAbonoProveedoresDialogoComponent } from './editar-cargo-abono-proveedores-dialogo.component';

describe('EditarCargoAbonoProveedoresDialogoComponent', () => {
  let component: EditarCargoAbonoProveedoresDialogoComponent;
  let fixture: ComponentFixture<EditarCargoAbonoProveedoresDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCargoAbonoProveedoresDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCargoAbonoProveedoresDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
