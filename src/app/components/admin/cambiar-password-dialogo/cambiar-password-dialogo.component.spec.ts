import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPasswordDialogoComponent } from './cambiar-password-dialogo.component';

describe('CambiarPasswordDialogoComponent', () => {
  let component: CambiarPasswordDialogoComponent;
  let fixture: ComponentFixture<CambiarPasswordDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarPasswordDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPasswordDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
