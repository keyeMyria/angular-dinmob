import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPartidaDialogoComponent } from './editar-partida-dialogo.component';

describe('EditarPartidaDialogoComponent', () => {
  let component: EditarPartidaDialogoComponent;
  let fixture: ComponentFixture<EditarPartidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPartidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPartidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
