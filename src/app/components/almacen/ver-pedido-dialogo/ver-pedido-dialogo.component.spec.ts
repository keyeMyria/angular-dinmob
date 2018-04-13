import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPedidoDialogoComponent } from './ver-pedido-dialogo.component';

describe('VerPedidoDialogoComponent', () => {
  let component: VerPedidoDialogoComponent;
  let fixture: ComponentFixture<VerPedidoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPedidoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPedidoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
