import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosSobrasComponent } from './gastos-sobras.component';

describe('GastosSobrasComponent', () => {
  let component: GastosSobrasComponent;
  let fixture: ComponentFixture<GastosSobrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosSobrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosSobrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
