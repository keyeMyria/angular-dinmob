import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoInsumoComponent } from './catalogo-insumo.component';

describe('CatalogoInsumoComponent', () => {
  let component: CatalogoInsumoComponent;
  let fixture: ComponentFixture<CatalogoInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
