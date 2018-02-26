import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialApartadosComponent } from './historial-apartados.component';

describe('HistorialApartadosComponent', () => {
  let component: HistorialApartadosComponent;
  let fixture: ComponentFixture<HistorialApartadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialApartadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialApartadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
