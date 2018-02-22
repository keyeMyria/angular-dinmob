import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInstitutoCreditoDialogoComponent } from './agregar-instituto-credito-dialogo.component';

describe('AgregarInstitutoCreditoDialogoComponent', () => {
  let component: AgregarInstitutoCreditoDialogoComponent;
  let fixture: ComponentFixture<AgregarInstitutoCreditoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarInstitutoCreditoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInstitutoCreditoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
