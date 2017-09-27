import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInsumoDialogoComponent } from './agregar-insumo-dialogo.component';

describe('AgregarInsumoDialogoComponent', () => {
  let component: AgregarInsumoDialogoComponent;
  let fixture: ComponentFixture<AgregarInsumoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarInsumoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInsumoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
