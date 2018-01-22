import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDocumentoDialogoComponent } from './editar-documento-dialogo.component';

describe('EditarDocumentoDialogoComponent', () => {
  let component: EditarDocumentoDialogoComponent;
  let fixture: ComponentFixture<EditarDocumentoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDocumentoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDocumentoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
