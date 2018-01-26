import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSinLoteComponent } from './cliente-sin-lote.component';

describe('ClienteSinLoteComponent', () => {
  let component: ClienteSinLoteComponent;
  let fixture: ComponentFixture<ClienteSinLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteSinLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSinLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
