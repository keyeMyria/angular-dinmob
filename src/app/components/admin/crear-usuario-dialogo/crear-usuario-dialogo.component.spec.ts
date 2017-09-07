import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUsuarioDialogoComponent } from './crear-usuario-dialogo.component';

describe('CrearUsuarioDialogoComponent', () => {
  let component: CrearUsuarioDialogoComponent;
  let fixture: ComponentFixture<CrearUsuarioDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuarioDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUsuarioDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
