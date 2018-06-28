import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasAvancesConfigDialogoComponent } from './mapas-avances-config-dialogo.component';

describe('MapasAvancesConfigDialogoComponent', () => {
  let component: MapasAvancesConfigDialogoComponent;
  let fixture: ComponentFixture<MapasAvancesConfigDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasAvancesConfigDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasAvancesConfigDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
