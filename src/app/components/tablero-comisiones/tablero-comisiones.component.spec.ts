import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroComisionesComponent } from './tablero-comisiones.component';

describe('TableroComisionesComponent', () => {
  let component: TableroComisionesComponent;
  let fixture: ComponentFixture<TableroComisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroComisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroComisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
