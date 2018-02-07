import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAvancesComponent } from './tablero-avances.component';

describe('TableroAvancesComponent', () => {
  let component: TableroAvancesComponent;
  let fixture: ComponentFixture<TableroAvancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroAvancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroAvancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
