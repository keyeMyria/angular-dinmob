import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDatosFirmaDialogoComponent } from './ver-datos-firma-dialogo.component';

describe('VerDatosFirmaDialogoComponent', () => {
  let component: VerDatosFirmaDialogoComponent;
  let fixture: ComponentFixture<VerDatosFirmaDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerDatosFirmaDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDatosFirmaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
