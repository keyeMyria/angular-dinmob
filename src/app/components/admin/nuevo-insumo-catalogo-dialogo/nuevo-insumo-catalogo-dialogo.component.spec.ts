import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoInsumoCatalogoDialogoComponent } from './nuevo-insumo-catalogo-dialogo.component';

describe('NuevoInsumoCatalogoDialogoComponent', () => {
  let component: NuevoInsumoCatalogoDialogoComponent;
  let fixture: ComponentFixture<NuevoInsumoCatalogoDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoInsumoCatalogoDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoInsumoCatalogoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
