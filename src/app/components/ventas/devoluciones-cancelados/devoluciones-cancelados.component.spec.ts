import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionesCanceladosComponent } from './devoluciones-cancelados.component';

describe('DevolucionesCanceladosComponent', () => {
  let component: DevolucionesCanceladosComponent;
  let fixture: ComponentFixture<DevolucionesCanceladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolucionesCanceladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionesCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
