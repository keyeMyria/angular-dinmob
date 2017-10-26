import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasEntregaComponent } from './actas-entrega.component';

describe('ActasEntregaComponent', () => {
  let component: ActasEntregaComponent;
  let fixture: ComponentFixture<ActasEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActasEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActasEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
