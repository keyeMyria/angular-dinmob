import { TestBed, inject } from '@angular/core/testing';

import { PartidasUrbanizacionResolverService } from './partidas-urbanizacion-resolver.service';

describe('PartidasUrbanizacionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartidasUrbanizacionResolverService]
    });
  });

  it('should be created', inject([PartidasUrbanizacionResolverService], (service: PartidasUrbanizacionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
