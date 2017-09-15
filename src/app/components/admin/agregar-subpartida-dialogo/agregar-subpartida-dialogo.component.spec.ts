import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSubpartidaDialogoComponent } from './agregar-subpartida-dialogo.component';

describe('AgregarSubpartidaDialogoComponent', () => {
  let component: AgregarSubpartidaDialogoComponent;
  let fixture: ComponentFixture<AgregarSubpartidaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSubpartidaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSubpartidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
