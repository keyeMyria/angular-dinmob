import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEntradasComponent } from './reporte-entradas.component';

describe('ReporteEntradasComponent', () => {
  let component: ReporteEntradasComponent;
  let fixture: ComponentFixture<ReporteEntradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEntradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
