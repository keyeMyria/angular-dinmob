import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLoteDialogoComponent } from './editar-lote-dialogo.component';

describe('EditarLoteDialogoComponent', () => {
  let component: EditarLoteDialogoComponent;
  let fixture: ComponentFixture<EditarLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
