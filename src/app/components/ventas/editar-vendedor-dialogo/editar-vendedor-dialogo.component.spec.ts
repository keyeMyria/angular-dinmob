import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVendedorDialogoComponent } from './editar-vendedor-dialogo.component';

describe('EditarVendedorDialogoComponent', () => {
  let component: EditarVendedorDialogoComponent;
  let fixture: ComponentFixture<EditarVendedorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVendedorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVendedorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
