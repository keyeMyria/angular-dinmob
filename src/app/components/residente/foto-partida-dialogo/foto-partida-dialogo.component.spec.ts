import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoPartidaDialogoComponent } from './foto-partida-dialogo.component';

describe('FotoPartidaDialogoComponent', () => {
  let component: FotoPartidaDialogoComponent;
  let fixture: ComponentFixture<FotoPartidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoPartidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoPartidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
