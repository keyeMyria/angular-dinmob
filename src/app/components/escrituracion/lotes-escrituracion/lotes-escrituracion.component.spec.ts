import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesEscrituracionComponent } from './lotes-escrituracion.component';

describe('LotesEscrituracionComponent', () => {
  let component: LotesEscrituracionComponent;
  let fixture: ComponentFixture<LotesEscrituracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesEscrituracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesEscrituracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
