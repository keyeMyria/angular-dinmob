import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEntradaDialogoComponent } from './ver-entrada-dialogo.component';

describe('VerEntradaDialogoComponent', () => {
  let component: VerEntradaDialogoComponent;
  let fixture: ComponentFixture<VerEntradaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEntradaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEntradaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
