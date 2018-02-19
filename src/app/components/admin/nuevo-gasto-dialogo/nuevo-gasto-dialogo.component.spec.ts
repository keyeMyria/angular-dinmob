import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoGastoDialogoComponent } from './nuevo-gasto-dialogo.component';

describe('NuevoGastoDialogoComponent', () => {
  let component: NuevoGastoDialogoComponent;
  let fixture: ComponentFixture<NuevoGastoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoGastoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoGastoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
