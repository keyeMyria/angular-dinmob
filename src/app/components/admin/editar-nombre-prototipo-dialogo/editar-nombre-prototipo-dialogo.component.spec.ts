import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNombrePrototipoDialogoComponent } from './editar-nombre-prototipo-dialogo.component';

describe('EditarNombrePrototipoDialogoComponent', () => {
  let component: EditarNombrePrototipoDialogoComponent;
  let fixture: ComponentFixture<EditarNombrePrototipoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarNombrePrototipoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarNombrePrototipoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
