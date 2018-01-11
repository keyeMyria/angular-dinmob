import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarManzanaDialogoComponent } from './editar-manzana-dialogo.component';

describe('EditarManzanaDialogoComponent', () => {
  let component: EditarManzanaDialogoComponent;
  let fixture: ComponentFixture<EditarManzanaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarManzanaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarManzanaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
