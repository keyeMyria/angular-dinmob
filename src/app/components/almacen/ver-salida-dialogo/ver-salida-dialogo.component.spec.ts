import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSalidaDialogoComponent } from './ver-salida-dialogo.component';

describe('VerSalidaDialogoComponent', () => {
  let component: VerSalidaDialogoComponent;
  let fixture: ComponentFixture<VerSalidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSalidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSalidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
