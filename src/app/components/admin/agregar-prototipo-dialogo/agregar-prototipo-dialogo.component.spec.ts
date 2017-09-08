import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrototipoDialogoComponent } from './agregar-prototipo-dialogo.component';

describe('AgregarPrototipoDialogoComponent', () => {
  let component: AgregarPrototipoDialogoComponent;
  let fixture: ComponentFixture<AgregarPrototipoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrototipoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrototipoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
