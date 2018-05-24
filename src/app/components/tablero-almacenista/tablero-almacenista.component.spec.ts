import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAlmacenistaComponent } from './tablero-almacenista.component';

describe('TableroAlmacenistaComponent', () => {
  let component: TableroAlmacenistaComponent;
  let fixture: ComponentFixture<TableroAlmacenistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroAlmacenistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroAlmacenistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
