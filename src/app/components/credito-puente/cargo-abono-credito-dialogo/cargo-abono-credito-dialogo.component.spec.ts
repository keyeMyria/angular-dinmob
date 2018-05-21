import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoAbonoCreditoDialogoComponent } from './cargo-abono-credito-dialogo.component';

describe('CargoAbonoCreditoDialogoComponent', () => {
  let component: CargoAbonoCreditoDialogoComponent;
  let fixture: ComponentFixture<CargoAbonoCreditoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargoAbonoCreditoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoAbonoCreditoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
