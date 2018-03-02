import { TestBed, inject } from '@angular/core/testing';

import { VendedoresResolverService } from './vendedores-resolver.service';

describe('VendedoresResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VendedoresResolverService]
    });
  });

  it('should be created', inject([VendedoresResolverService], (service: VendedoresResolverService) => {
    expect(service).toBeTruthy();
  }));
});
