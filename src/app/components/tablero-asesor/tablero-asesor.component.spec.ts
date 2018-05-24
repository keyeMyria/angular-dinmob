import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroAsesorComponent } from './tablero-asesor.component';

describe('TableroAsesorComponent', () => {
  let component: TableroAsesorComponent;
  let fixture: ComponentFixture<TableroAsesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableroAsesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroAsesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
