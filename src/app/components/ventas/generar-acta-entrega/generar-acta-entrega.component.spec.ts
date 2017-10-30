import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarActaEntregaComponent } from './generar-acta-entrega.component';

describe('GenerarActaEntregaComponent', () => {
  let component: GenerarActaEntregaComponent;
  let fixture: ComponentFixture<GenerarActaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarActaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarActaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
