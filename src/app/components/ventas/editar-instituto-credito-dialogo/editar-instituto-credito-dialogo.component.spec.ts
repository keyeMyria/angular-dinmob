import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInstitutoCreditoDialogoComponent } from './editar-instituto-credito-dialogo.component';

describe('EditarInstitutoCreditoDialogoComponent', () => {
  let component: EditarInstitutoCreditoDialogoComponent;
  let fixture: ComponentFixture<EditarInstitutoCreditoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInstitutoCreditoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInstitutoCreditoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
