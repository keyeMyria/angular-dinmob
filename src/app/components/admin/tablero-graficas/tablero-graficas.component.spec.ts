import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroGraficasComponent } from './tablero-graficas.component';

describe('TableroGraficasComponent', () => {
  let component: TableroGraficasComponent;
  let fixture: ComponentFixture<TableroGraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroGraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
