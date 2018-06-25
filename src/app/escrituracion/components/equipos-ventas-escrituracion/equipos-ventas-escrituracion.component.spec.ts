import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposVentasEscrituracionComponent } from './equipos-ventas-escrituracion.component';

describe('EquiposVentasEscrituracionComponent', () => {
  let component: EquiposVentasEscrituracionComponent;
  let fixture: ComponentFixture<EquiposVentasEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposVentasEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposVentasEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
