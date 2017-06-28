import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrollosComponent } from './desarrollos.component';

describe('DesarrollosComponent', () => {
  let component: DesarrollosComponent;
  let fixture: ComponentFixture<DesarrollosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesarrollosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrollosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
