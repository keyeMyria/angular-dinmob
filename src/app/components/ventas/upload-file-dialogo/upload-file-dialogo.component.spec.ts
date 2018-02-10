import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDialogoComponent } from './upload-file-dialogo.component';

describe('UploadFileDialogoComponent', () => {
  let component: UploadFileDialogoComponent;
  let fixture: ComponentFixture<UploadFileDialogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileDialogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
