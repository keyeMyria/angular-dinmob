import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposVentasComponent } from './equipos-ventas.component';

describe('EquiposVentasComponent', () => {
  let component: EquiposVentasComponent;
  let fixture: ComponentFixture<EquiposVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquiposVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquiposVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
