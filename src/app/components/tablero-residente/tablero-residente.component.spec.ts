import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroResidenteComponent } from './tablero-residente.component';

describe('TableroResidenteComponent', () => {
  let component: TableroResidenteComponent;
  let fixture: ComponentFixture<TableroResidenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroResidenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
