import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoProveedoresComponent } from './saldo-proveedores.component';

describe('SaldoProveedoresComponent', () => {
  let component: SaldoProveedoresComponent;
  let fixture: ComponentFixture<SaldoProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldoProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
