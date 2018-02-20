import { TestBed, inject } from '@angular/core/testing';

import { TrabajadorService } from './trabajador.service';

describe('TrabajadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrabajadorService]
    });
  });

  it('should be created', inject([TrabajadorService], (service: TrabajadorService) => {
    expect(service).toBeTruthy();
  }));
});
