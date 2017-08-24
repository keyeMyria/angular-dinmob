import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioDialogoComponent } from './editar-usuario-dialogo.component';

describe('EditarUsuarioDialogoComponent', () => {
  let component: EditarUsuarioDialogoComponent;
  let fixture: ComponentFixture<EditarUsuarioDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUsuarioDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
