import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaAlertaComponent } from './salida-alerta.component';

describe('SalidaAlertaComponent', () => {
  let component: SalidaAlertaComponent;
  let fixture: ComponentFixture<SalidaAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaAlertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
