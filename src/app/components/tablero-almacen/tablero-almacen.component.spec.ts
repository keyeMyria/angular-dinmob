import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAlmacenComponent } from './tablero-almacen.component';

describe('TableroAlmacenComponent', () => {
  let component: TableroAlmacenComponent;
  let fixture: ComponentFixture<TableroAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
