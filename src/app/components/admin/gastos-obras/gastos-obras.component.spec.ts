import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosObrasComponent } from './gastos-obras.component';

describe('GastosSobrasComponent', () => {
  let component: GastosObrasComponent;
  let fixture: ComponentFixture<GastosObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
