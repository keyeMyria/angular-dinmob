import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoClienteDialogoComponent } from './nuevo-cliente-dialogo.component';

describe('NuevoClienteDialogoComponent', () => {
  let component: NuevoClienteDialogoComponent;
  let fixture: ComponentFixture<NuevoClienteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoClienteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoClienteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
