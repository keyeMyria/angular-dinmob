import { TestBed, inject } from '@angular/core/testing';

import { FamiliasInsumosResolverService } from './familias-insumos-resolver.service';

describe('FamiliasInsumosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FamiliasInsumosResolverService]
    });
  });

  it('should be created', inject([FamiliasInsumosResolverService], (service: FamiliasInsumosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
