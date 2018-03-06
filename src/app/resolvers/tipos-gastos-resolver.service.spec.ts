import { TestBed, inject } from '@angular/core/testing';

import { TiposGastosResolverService } from './tipos-gastos-resolver.service';

describe('TiposGastosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposGastosResolverService]
    });
  });

  it('should be created', inject([TiposGastosResolverService], (service: TiposGastosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
