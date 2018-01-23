import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCedulaFiscalDialogoComponent } from './ver-cedula-fiscal-dialogo.component';

describe('VerCedulaFiscalDialogoComponent', () => {
  let component: VerCedulaFiscalDialogoComponent;
  let fixture: ComponentFixture<VerCedulaFiscalDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCedulaFiscalDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCedulaFiscalDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
