import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsumoDialogoComponent } from './editar-insumo-dialogo.component';

describe('EditarInsumoDialogoComponent', () => {
  let component: EditarInsumoDialogoComponent;
  let fixture: ComponentFixture<EditarInsumoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInsumoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInsumoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
