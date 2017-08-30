import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaDialogoComponent } from './agregar-categoria-dialogo.component';

describe('AgregarCategoriaDialogoComponent', () => {
  let component: AgregarCategoriaDialogoComponent;
  let fixture: ComponentFixture<AgregarCategoriaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCategoriaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
