import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMaterialDialogoComponent } from './editar-material-dialogo.component';

describe('EditarMaterialDialogoComponent', () => {
  let component: EditarMaterialDialogoComponent;
  let fixture: ComponentFixture<EditarMaterialDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMaterialDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMaterialDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
