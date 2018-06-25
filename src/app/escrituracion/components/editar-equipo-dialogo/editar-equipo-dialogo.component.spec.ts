import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEquipoDialogoComponent } from './editar-equipo-dialogo.component';

describe('EditarEquipoDialogoComponent', () => {
  let component: EditarEquipoDialogoComponent;
  let fixture: ComponentFixture<EditarEquipoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEquipoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEquipoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
