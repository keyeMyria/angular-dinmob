import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInsumoCatalogoDialogoComponent } from './editar-insumo-catalogo-dialogo.component';

describe('EditarInsumoCatalogoDialogoComponent', () => {
  let component: EditarInsumoCatalogoDialogoComponent;
  let fixture: ComponentFixture<EditarInsumoCatalogoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInsumoCatalogoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInsumoCatalogoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
