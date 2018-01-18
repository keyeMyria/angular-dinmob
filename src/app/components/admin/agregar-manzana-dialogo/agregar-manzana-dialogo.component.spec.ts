import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarManzanaDialogoComponent } from './agregar-manzana-dialogo.component';

describe('AgregarManzanaDialogoComponent', () => {
  let component: AgregarManzanaDialogoComponent;
  let fixture: ComponentFixture<AgregarManzanaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarManzanaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarManzanaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
