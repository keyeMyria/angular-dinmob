import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroVentasComponent } from './tablero-ventas.component';

describe('TableroVentasComponent', () => {
  let component: TableroVentasComponent;
  let fixture: ComponentFixture<TableroVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
