import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEscrituracionComponent } from './clientes-escrituracion.component';

describe('ClientesEscrituracionComponent', () => {
  let component: ClientesEscrituracionComponent;
  let fixture: ComponentFixture<ClientesEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
