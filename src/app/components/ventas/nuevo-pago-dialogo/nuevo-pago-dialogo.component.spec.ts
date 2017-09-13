import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPagoDialogoComponent } from './nuevo-pago-dialogo.component';

describe('NuevoPagoDialogoComponent', () => {
  let component: NuevoPagoDialogoComponent;
  let fixture: ComponentFixture<NuevoPagoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPagoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPagoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
