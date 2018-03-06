import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastoDialogoComponent } from './editar-gasto-dialogo.component';

describe('EditarGastoDialogoComponent', () => {
  let component: EditarGastoDialogoComponent;
  let fixture: ComponentFixture<EditarGastoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGastoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGastoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
