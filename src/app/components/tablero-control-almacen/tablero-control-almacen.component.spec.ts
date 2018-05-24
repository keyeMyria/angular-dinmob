import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroControlAlmacenComponent } from './tablero-control-almacen.component';

describe('TableroControlAlmacenComponent', () => {
  let component: TableroControlAlmacenComponent;
  let fixture: ComponentFixture<TableroControlAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroControlAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroControlAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
