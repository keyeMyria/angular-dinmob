import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesMapaVentasBottomSheetComponent } from './opciones-mapa-ventas-bottom-sheet.component';

describe('OpcionesMapaVentasBottomSheetComponent', () => {
  let component: OpcionesMapaVentasBottomSheetComponent;
  let fixture: ComponentFixture<OpcionesMapaVentasBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionesMapaVentasBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesMapaVentasBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
