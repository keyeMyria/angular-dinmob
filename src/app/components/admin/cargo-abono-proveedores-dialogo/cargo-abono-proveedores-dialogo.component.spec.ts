import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoAbonoProveedoresDialogoComponent } from './cargo-abono-proveedores-dialogo.component';

describe('CargoAbonoProveedoresDialogoComponent', () => {
  let component: CargoAbonoProveedoresDialogoComponent;
  let fixture: ComponentFixture<CargoAbonoProveedoresDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoAbonoProveedoresDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoAbonoProveedoresDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
