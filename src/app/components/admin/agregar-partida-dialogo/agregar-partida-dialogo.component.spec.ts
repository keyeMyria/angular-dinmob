import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPartidaDialogoComponent } from './agregar-partida-dialogo.component';

describe('AgregarPartidaDialogoComponent', () => {
  let component: AgregarPartidaDialogoComponent;
  let fixture: ComponentFixture<AgregarPartidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPartidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPartidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
