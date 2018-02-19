import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProveedorDialogoComponent } from './nuevo-proveedor-dialogo.component';

describe('NuevoProveedorDialogoComponent', () => {
  let component: NuevoProveedorDialogoComponent;
  let fixture: ComponentFixture<NuevoProveedorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoProveedorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoProveedorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
