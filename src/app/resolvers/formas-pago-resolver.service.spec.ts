import { TestBed, inject } from '@angular/core/testing';

import { FormasPagoResolverService } from './formas-pago-resolver.service';

describe('FormasPagoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormasPagoResolverService]
    });
  });

  it('should be created', inject([FormasPagoResolverService], (service: FormasPagoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
