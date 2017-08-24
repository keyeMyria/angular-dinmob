import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasAvancesComponent } from './mapas-avances.component';

describe('MapasAvancesComponent', () => {
  let component: MapasAvancesComponent;
  let fixture: ComponentFixture<MapasAvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasAvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasAvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
