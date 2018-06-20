import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionEscrituracionComponent } from './configuracion-escrituracion.component';

describe('ConfiguracionEscrituracionComponent', () => {
  let component: ConfiguracionEscrituracionComponent;
  let fixture: ComponentFixture<ConfiguracionEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
