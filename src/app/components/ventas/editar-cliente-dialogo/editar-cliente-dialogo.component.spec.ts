import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClienteDialogoComponent } from './editar-cliente-dialogo.component';

describe('EditarClienteDialogoComponent', () => {
  let component: EditarClienteDialogoComponent;
  let fixture: ComponentFixture<EditarClienteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarClienteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarClienteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
