import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioAvancesDialogoComponent } from './comentario-avances-dialogo.component';

describe('ComentarioAvancesDialogoComponent', () => {
  let component: ComentarioAvancesDialogoComponent;
  let fixture: ComponentFixture<ComentarioAvancesDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentarioAvancesDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentarioAvancesDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
