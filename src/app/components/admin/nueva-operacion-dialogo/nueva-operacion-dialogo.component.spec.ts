import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaOperacionDialogoComponent } from './nueva-operacion-dialogo.component';

describe('NuevaOperacionDialogoComponent', () => {
  let component: NuevaOperacionDialogoComponent;
  let fixture: ComponentFixture<NuevaOperacionDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaOperacionDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaOperacionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
