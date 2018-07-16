import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsumosAvanceDialogoComponent } from './insumos-avance-dialogo.component';

describe('InsumosAvanceDialogoComponent', () => {
  let component: InsumosAvanceDialogoComponent;
  let fixture: ComponentFixture<InsumosAvanceDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumosAvanceDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosAvanceDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
