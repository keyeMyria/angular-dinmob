import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCelulaFiscalDialogoComponent } from './ver-celula-fiscal-dialogo.component';

describe('VerCelulaFiscalDialogoComponent', () => {
  let component: VerCelulaFiscalDialogoComponent;
  let fixture: ComponentFixture<VerCelulaFiscalDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCelulaFiscalDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCelulaFiscalDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
