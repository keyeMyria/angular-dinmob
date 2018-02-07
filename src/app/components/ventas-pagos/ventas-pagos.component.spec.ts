import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPagosComponent } from './ventas-pagos.component';

describe('VentasPagosComponent', () => {
  let component: VentasPagosComponent;
  let fixture: ComponentFixture<VentasPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
