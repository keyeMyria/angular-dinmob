import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProveedorDialogoComponent } from './editar-proveedor-dialogo.component';

describe('EditarProveedorDialogoComponent', () => {
  let component: EditarProveedorDialogoComponent;
  let fixture: ComponentFixture<EditarProveedorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProveedorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProveedorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
