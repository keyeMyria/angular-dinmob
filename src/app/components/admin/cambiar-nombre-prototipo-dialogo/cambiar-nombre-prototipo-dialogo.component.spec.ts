import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarNombrePrototipoDialogoComponent } from './cambiar-nombre-prototipo-dialogo.component';

describe('CambiarNombrePrototipoDialogoComponent', () => {
  let component: CambiarNombrePrototipoDialogoComponent;
  let fixture: ComponentFixture<CambiarNombrePrototipoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarNombrePrototipoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarNombrePrototipoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
