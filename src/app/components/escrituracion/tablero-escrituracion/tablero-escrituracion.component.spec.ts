import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroEscrituracionComponent } from './tablero-escrituracion.component';

describe('TableroEscrituracionComponent', () => {
  let component: TableroEscrituracionComponent;
  let fixture: ComponentFixture<TableroEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
