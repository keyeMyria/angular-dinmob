import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActaEntregaComponent } from './crear-acta-entrega.component';

describe('CrearActaEntregaComponent', () => {
  let component: CrearActaEntregaComponent;
  let fixture: ComponentFixture<CrearActaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearActaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearActaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
