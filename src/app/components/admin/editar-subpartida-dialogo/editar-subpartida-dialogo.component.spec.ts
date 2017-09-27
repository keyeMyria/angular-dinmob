import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubpartidaDialogoComponent } from './editar-subpartida-dialogo.component';

describe('EditarSubpartidaDialogoComponent', () => {
  let component: EditarSubpartidaDialogoComponent;
  let fixture: ComponentFixture<EditarSubpartidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSubpartidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSubpartidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
