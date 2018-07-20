import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesInfonavitComponent } from './lotes-infonavit.component';

describe('LotesInfonavitComponent', () => {
  let component: LotesInfonavitComponent;
  let fixture: ComponentFixture<LotesInfonavitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesInfonavitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesInfonavitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
