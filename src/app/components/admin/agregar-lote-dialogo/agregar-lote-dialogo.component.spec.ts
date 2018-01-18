import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLoteDialogoComponent } from './agregar-lote-dialogo.component';

describe('AgregarLoteDialogoComponent', () => {
  let component: AgregarLoteDialogoComponent;
  let fixture: ComponentFixture<AgregarLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
