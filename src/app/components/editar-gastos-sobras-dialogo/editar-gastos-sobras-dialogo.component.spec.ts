import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGastosSobrasDialogoComponent } from './editar-gastos-sobras-dialogo.component';

describe('EditarGastosSobrasDialogoComponent', () => {
  let component: EditarGastosSobrasDialogoComponent;
  let fixture: ComponentFixture<EditarGastosSobrasDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGastosSobrasDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGastosSobrasDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
