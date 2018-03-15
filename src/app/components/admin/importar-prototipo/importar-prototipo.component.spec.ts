import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarPrototipoComponent } from './importar-prototipo.component';

describe('ImportarPrototipoComponent', () => {
  let component: ImportarPrototipoComponent;
  let fixture: ComponentFixture<ImportarPrototipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarPrototipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportarPrototipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
