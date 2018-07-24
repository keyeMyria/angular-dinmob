import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComentarioPosventaDialogoComponent } from './editar-comentario-posventa-dialogo.component';

describe('EditarComentarioPosventaDialogoComponent', () => {
  let component: EditarComentarioPosventaDialogoComponent;
  let fixture: ComponentFixture<EditarComentarioPosventaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarComentarioPosventaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComentarioPosventaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
