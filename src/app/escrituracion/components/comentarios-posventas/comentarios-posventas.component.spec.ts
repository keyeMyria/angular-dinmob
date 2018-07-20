import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosPosventasComponent } from './comentarios-posventas.component';

describe('ComentariosPosventasComponent', () => {
  let component: ComentariosPosventasComponent;
  let fixture: ComponentFixture<ComentariosPosventasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosPosventasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosPosventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
