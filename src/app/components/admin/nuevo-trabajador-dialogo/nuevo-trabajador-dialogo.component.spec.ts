import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTrabajadorDialogoComponent } from './nuevo-trabajador-dialogo.component';

describe('NuevoTrabajadorDialogoComponent', () => {
  let component: NuevoTrabajadorDialogoComponent;
  let fixture: ComponentFixture<NuevoTrabajadorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTrabajadorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTrabajadorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
