import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancesLoteDialogoComponent } from './avances-lote-dialogo.component';

describe('AvancesLoteDialogoComponent', () => {
  let component: AvancesLoteDialogoComponent;
  let fixture: ComponentFixture<AvancesLoteDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvancesLoteDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvancesLoteDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
