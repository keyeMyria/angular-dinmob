import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMaterialDialogoComponent } from './nuevo-material-dialogo.component';

describe('NuevoMaterialDialogoComponent', () => {
  let component: NuevoMaterialDialogoComponent;
  let fixture: ComponentFixture<NuevoMaterialDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMaterialDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMaterialDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
