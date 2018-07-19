import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesEjecutarComponent } from './materiales-ejecutar.component';

describe('MaterialesEjecutarComponent', () => {
  let component: MaterialesEjecutarComponent;
  let fixture: ComponentFixture<MaterialesEjecutarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialesEjecutarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesEjecutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
