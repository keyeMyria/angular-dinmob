import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteEscrituracionComponent } from './editar-cliente-escrituracion.component';

describe('EditarClienteEscrituracionComponent', () => {
  let component: EditarClienteEscrituracionComponent;
  let fixture: ComponentFixture<EditarClienteEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarClienteEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClienteEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
