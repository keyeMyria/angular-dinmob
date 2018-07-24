import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFotoLotePosventaDialogoComponent } from './agregar-foto-lote-posventa-dialogo.component';

describe('AgregarFotoLotePosventaDialogoComponent', () => {
  let component: AgregarFotoLotePosventaDialogoComponent;
  let fixture: ComponentFixture<AgregarFotoLotePosventaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarFotoLotePosventaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarFotoLotePosventaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
