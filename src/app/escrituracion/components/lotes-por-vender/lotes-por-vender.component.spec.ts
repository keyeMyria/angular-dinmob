import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesPorVenderComponent } from './lotes-por-vender.component';

describe('LotesPorVenderComponent', () => {
  let component: LotesPorVenderComponent;
  let fixture: ComponentFixture<LotesPorVenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesPorVenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesPorVenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
