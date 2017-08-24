import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototiposComponent } from './prototipos.component';

describe('PrototiposComponent', () => {
  let component: PrototiposComponent;
  let fixture: ComponentFixture<PrototiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrototiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
