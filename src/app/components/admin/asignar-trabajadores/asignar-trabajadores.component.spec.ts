import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTrabajadoresComponent } from './asignar-trabajadores.component';

describe('AsignarTrabajadoresComponent', () => {
  let component: AsignarTrabajadoresComponent;
  let fixture: ComponentFixture<AsignarTrabajadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarTrabajadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
