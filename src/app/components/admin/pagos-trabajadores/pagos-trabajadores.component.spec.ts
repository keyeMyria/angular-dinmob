import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosTrabajadoresComponent } from './pagos-trabajadores.component';

describe('PagosTrabajadoresComponent', () => {
  let component: PagosTrabajadoresComponent;
  let fixture: ComponentFixture<PagosTrabajadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosTrabajadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
