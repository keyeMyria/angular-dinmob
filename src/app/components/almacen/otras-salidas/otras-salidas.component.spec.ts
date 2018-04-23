import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrasSalidasComponent } from './otras-salidas.component';

describe('OtrasSalidasComponent', () => {
  let component: OtrasSalidasComponent;
  let fixture: ComponentFixture<OtrasSalidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrasSalidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrasSalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
