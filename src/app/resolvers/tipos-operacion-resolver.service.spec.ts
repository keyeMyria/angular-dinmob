import { TestBed, inject } from '@angular/core/testing';

import { TiposOperacionResolverService } from './tipos-operacion-resolver.service';

describe('TiposOperacionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposOperacionResolverService]
    });
  });

  it('should be created', inject([TiposOperacionResolverService], (service: TiposOperacionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
