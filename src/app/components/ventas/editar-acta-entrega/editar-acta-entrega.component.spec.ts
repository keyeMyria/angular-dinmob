import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActaEntregaComponent } from './editar-acta-entrega.component';

describe('EditarActaEntregaComponent', () => {
  let component: EditarActaEntregaComponent;
  let fixture: ComponentFixture<EditarActaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarActaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
