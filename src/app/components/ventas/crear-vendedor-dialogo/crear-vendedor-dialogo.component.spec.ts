import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearVendedorDialogoComponent } from './crear-vendedor-dialogo.component';

describe('CrearVendedorDialogoComponent', () => {
  let component: CrearVendedorDialogoComponent;
  let fixture: ComponentFixture<CrearVendedorDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearVendedorDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearVendedorDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
