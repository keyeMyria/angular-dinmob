import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteEscrituracionDialogoComponent } from './editar-cliente-escrituracion-dialogo.component';

describe('EditarClienteEscrituracionDialogoComponent', () => {
  let component: EditarClienteEscrituracionDialogoComponent;
  let fixture: ComponentFixture<EditarClienteEscrituracionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarClienteEscrituracionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClienteEscrituracionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
