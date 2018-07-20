import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesEnTramiteComponent } from './lotes-en-tramite.component';

describe('LotesEnTramiteComponent', () => {
  let component: LotesEnTramiteComponent;
  let fixture: ComponentFixture<LotesEnTramiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesEnTramiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesEnTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
