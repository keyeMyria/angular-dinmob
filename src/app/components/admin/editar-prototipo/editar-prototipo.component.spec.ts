import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrototipoComponent } from './editar-prototipo.component';

describe('EditarPrototipoComponent', () => {
  let component: EditarPrototipoComponent;
  let fixture: ComponentFixture<EditarPrototipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrototipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrototipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
