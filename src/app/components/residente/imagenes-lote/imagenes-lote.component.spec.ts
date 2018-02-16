import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesLoteComponent } from './imagenes-lote.component';

describe('ImagenesLoteComponent', () => {
  let component: ImagenesLoteComponent;
  let fixture: ComponentFixture<ImagenesLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenesLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenesLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
