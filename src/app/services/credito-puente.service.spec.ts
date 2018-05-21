import { TestBed, inject } from '@angular/core/testing';

import { CreditoPuenteService } from './credito-puente.service';

describe('CreditoPuenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditoPuenteService]
    });
  });

  it('should be created', inject([CreditoPuenteService], (service: CreditoPuenteService) => {
    expect(service).toBeTruthy();
  }));
});
