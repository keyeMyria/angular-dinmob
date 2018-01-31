import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTrabajadorDialogoComponent } from './editar-trabajador-dialogo.component';

describe('EditarTrabajadorDialogoComponent', () => {
  let component: EditarTrabajadorDialogoComponent;
  let fixture: ComponentFixture<EditarTrabajadorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTrabajadorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTrabajadorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
