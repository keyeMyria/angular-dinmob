import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarComentarioPosventaDialogoComponent } from './agregar-comentario-posventa-dialogo.component';

describe('AgregarComentarioPosventaDialogoComponent', () => {
  let component: AgregarComentarioPosventaDialogoComponent;
  let fixture: ComponentFixture<AgregarComentarioPosventaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarComentarioPosventaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarComentarioPosventaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
