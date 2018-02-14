import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasVentasConfigDialogoComponent } from './mapas-ventas-config-dialogo.component';

describe('MapasVentasConfigDialogoComponent', () => {
  let component: MapasVentasConfigDialogoComponent;
  let fixture: ComponentFixture<MapasVentasConfigDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasVentasConfigDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasVentasConfigDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
