import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaEntregaComponent } from './acta-entrega.component';

describe('ActaEntregaComponent', () => {
  let component: ActaEntregaComponent;
  let fixture: ComponentFixture<ActaEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActaEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActaEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
