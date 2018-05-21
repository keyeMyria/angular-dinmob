import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCargoAbonoCreditoDialogoComponent } from './editar-cargo-abono-credito-dialogo.component';

describe('EditarCargoAbonoCreditoDialogoComponent', () => {
  let component: EditarCargoAbonoCreditoDialogoComponent;
  let fixture: ComponentFixture<EditarCargoAbonoCreditoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCargoAbonoCreditoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCargoAbonoCreditoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
