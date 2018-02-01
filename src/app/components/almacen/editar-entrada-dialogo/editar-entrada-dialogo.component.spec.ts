import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntradaDialogoComponent } from './editar-entrada-dialogo.component';

describe('EditarEntradaDialogoComponent', () => {
  let component: EditarEntradaDialogoComponent;
  let fixture: ComponentFixture<EditarEntradaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEntradaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEntradaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
