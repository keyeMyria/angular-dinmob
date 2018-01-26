import { TestBed, inject } from '@angular/core/testing';

import { TiposPagoResolverService } from './tipos-pago-resolver.service';

describe('TiposPagoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposPagoResolverService]
    });
  });

  it('should be created', inject([TiposPagoResolverService], (service: TiposPagoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
