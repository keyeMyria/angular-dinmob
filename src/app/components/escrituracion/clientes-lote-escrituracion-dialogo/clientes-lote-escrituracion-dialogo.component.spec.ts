import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesLoteEscrituracionDialogoComponent } from './clientes-lote-escrituracion-dialogo.component';

describe('ClientesLoteEscrituracionDialogoComponent', () => {
  let component: ClientesLoteEscrituracionDialogoComponent;
  let fixture: ComponentFixture<ClientesLoteEscrituracionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesLoteEscrituracionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesLoteEscrituracionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
