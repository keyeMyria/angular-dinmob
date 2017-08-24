import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraObraComponent } from './estructura-obra.component';

describe('EstructuraObraComponent', () => {
  let component: EstructuraObraComponent;
  let fixture: ComponentFixture<EstructuraObraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraObraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
