import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarObraDialogoComponent } from './agregar-obra-dialogo.component';

describe('AgregarObraDialogoComponent', () => {
  let component: AgregarObraDialogoComponent;
  let fixture: ComponentFixture<AgregarObraDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarObraDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarObraDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
