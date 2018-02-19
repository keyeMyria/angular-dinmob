import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesLotesDialogoComponent } from './imagenes-lotes-dialogo.component';

describe('ImagenesLotesDialogoComponent', () => {
  let component: ImagenesLotesDialogoComponent;
  let fixture: ComponentFixture<ImagenesLotesDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesLotesDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesLotesDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
