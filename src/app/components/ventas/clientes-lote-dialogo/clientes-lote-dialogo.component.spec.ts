import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesLoteDialogoComponent } from './clientes-lote-dialogo.component';

describe('ClientesLoteDialogoComponent', () => {
  let component: ClientesLoteDialogoComponent;
  let fixture: ComponentFixture<ClientesLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
