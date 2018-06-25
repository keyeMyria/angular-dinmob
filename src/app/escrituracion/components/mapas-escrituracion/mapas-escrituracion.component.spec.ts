import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasEscrituracionComponent } from './mapas-escrituracion.component';

describe('MapasEscrituracionComponent', () => {
  let component: MapasEscrituracionComponent;
  let fixture: ComponentFixture<MapasEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
