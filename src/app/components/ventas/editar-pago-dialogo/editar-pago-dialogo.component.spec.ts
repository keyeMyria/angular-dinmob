import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPagoDialogoComponent } from './editar-pago-dialogo.component';

describe('EditarPagoDialogoComponent', () => {
  let component: EditarPagoDialogoComponent;
  let fixture: ComponentFixture<EditarPagoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPagoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPagoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
