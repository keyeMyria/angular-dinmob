import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasLoteComponent } from './ventas-lote.component';

describe('VentasLoteComponent', () => {
  let component: VentasLoteComponent;
  let fixture: ComponentFixture<VentasLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
