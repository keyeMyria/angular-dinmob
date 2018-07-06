import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarClienteLoteDialogoComponent } from './agregar-cliente-lote-dialogo.component';

describe('AgregarClienteLoteDialogoComponent', () => {
  let component: AgregarClienteLoteDialogoComponent;
  let fixture: ComponentFixture<AgregarClienteLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarClienteLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarClienteLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
