import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasVentasVendedorComponent } from './graficas-ventas-vendedor.component';

describe('GraficasVentasVendedorComponent', () => {
  let component: GraficasVentasVendedorComponent;
  let fixture: ComponentFixture<GraficasVentasVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasVentasVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasVentasVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
