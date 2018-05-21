import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoPuenteComponent } from './credito-puente.component';

describe('CreditoPuenteComponent', () => {
  let component: CreditoPuenteComponent;
  let fixture: ComponentFixture<CreditoPuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoPuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoPuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
