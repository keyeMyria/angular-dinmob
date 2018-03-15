import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatoDialogoComponent } from './formato-dialogo.component';

describe('FormatoDialogoComponent', () => {
  let component: FormatoDialogoComponent;
  let fixture: ComponentFixture<FormatoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
