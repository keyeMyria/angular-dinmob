import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAvancesComponent } from './historial-avances.component';

describe('HistorialAvancesComponent', () => {
  let component: HistorialAvancesComponent;
  let fixture: ComponentFixture<HistorialAvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialAvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
