import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTareaDialogoComponent } from './editar-tarea-dialogo.component';

describe('EditarTareaDialogoComponent', () => {
  let component: EditarTareaDialogoComponent;
  let fixture: ComponentFixture<EditarTareaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTareaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTareaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
