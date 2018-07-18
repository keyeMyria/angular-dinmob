import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroJefeFrenteComponent } from './tablero-jefe-frente.component';

describe('TableroJefeFrenteComponent', () => {
  let component: TableroJefeFrenteComponent;
  let fixture: ComponentFixture<TableroJefeFrenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroJefeFrenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroJefeFrenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
