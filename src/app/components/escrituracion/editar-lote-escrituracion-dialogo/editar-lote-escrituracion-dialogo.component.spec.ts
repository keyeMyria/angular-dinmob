import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLoteEscrituracionDialogoComponent } from './editar-lote-escrituracion-dialogo.component';

describe('EditarLoteEscrituracionDialogoComponent', () => {
  let component: EditarLoteEscrituracionDialogoComponent;
  let fixture: ComponentFixture<EditarLoteEscrituracionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLoteEscrituracionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLoteEscrituracionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
