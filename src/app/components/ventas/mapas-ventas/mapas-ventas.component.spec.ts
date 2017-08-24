import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasVentasComponent } from './mapas-ventas.component';

describe('MapasVentasComponent', () => {
  let component: MapasVentasComponent;
  let fixture: ComponentFixture<MapasVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
