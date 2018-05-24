import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroContabilidadComponent } from './tablero-contabilidad.component';

describe('TableroContabilidadComponent', () => {
  let component: TableroContabilidadComponent;
  let fixture: ComponentFixture<TableroContabilidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroContabilidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroContabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
