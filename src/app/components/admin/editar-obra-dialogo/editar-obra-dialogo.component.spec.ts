import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarObraDialogoComponent } from './editar-obra-dialogo.component';

describe('EditarObraDialogoComponent', () => {
  let component: EditarObraDialogoComponent;
  let fixture: ComponentFixture<EditarObraDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarObraDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarObraDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
