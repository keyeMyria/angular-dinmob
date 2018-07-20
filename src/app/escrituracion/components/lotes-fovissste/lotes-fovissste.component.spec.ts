import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesFovisssteComponent } from './lotes-fovissste.component';

describe('LotesFovisssteComponent', () => {
  let component: LotesFovisssteComponent;
  let fixture: ComponentFixture<LotesFovisssteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesFovisssteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesFovisssteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
