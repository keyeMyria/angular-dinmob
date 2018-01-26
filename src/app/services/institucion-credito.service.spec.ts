import { TestBed, inject } from '@angular/core/testing';

import { InstitucionCreditoService } from './institucion-credito.service';

describe('InstitucionCreditoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitucionCreditoService]
    });
  });

  it('should be created', inject([InstitucionCreditoService], (service: InstitucionCreditoService) => {
    expect(service).toBeTruthy();
  }));
});
