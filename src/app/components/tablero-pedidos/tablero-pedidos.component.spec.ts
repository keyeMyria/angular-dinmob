import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroPedidosComponent } from './tablero-pedidos.component';

describe('TableroPedidosComponent', () => {
  let component: TableroPedidosComponent;
  let fixture: ComponentFixture<TableroPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
