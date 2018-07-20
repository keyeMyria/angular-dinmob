import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasVentasComponent } from './graficas-ventas.component';

describe('GraficasVentasComponent', () => {
  let component: GraficasVentasComponent;
  let fixture: ComponentFixture<GraficasVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficasVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
