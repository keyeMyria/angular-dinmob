import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDocumentoDialogoComponent } from './agregar-documento-dialogo.component';

describe('AgregarDocumentoDialogoComponent', () => {
  let component: AgregarDocumentoDialogoComponent;
  let fixture: ComponentFixture<AgregarDocumentoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDocumentoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDocumentoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
