import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTareaDialogoComponent } from './asignar-tarea-dialogo.component';

describe('AsignarTareaDialogoComponent', () => {
  let component: AsignarTareaDialogoComponent;
  let fixture: ComponentFixture<AsignarTareaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarTareaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTareaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
