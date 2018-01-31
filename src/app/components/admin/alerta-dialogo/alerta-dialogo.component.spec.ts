import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaDialogoComponent } from './alerta-dialogo.component';

describe('AlertaDialogoComponent', () => {
  let component: AlertaDialogoComponent;
  let fixture: ComponentFixture<AlertaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
