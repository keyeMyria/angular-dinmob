import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarBorradoDialogoComponent } from './confirmar-borrado-dialogo.component';

describe('ConfirmarBorradoDialogoComponent', () => {
  let component: ConfirmarBorradoDialogoComponent;
  let fixture: ComponentFixture<ConfirmarBorradoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarBorradoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarBorradoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
