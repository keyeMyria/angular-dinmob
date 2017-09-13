import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCompraDialogoComponent } from './nueva-compra-dialogo.component';

describe('NuevaCompraDialogoComponent', () => {
  let component: NuevaCompraDialogoComponent;
  let fixture: ComponentFixture<NuevaCompraDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaCompraDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCompraDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
