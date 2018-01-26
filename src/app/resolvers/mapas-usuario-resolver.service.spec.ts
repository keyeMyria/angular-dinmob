import { TestBed, inject } from '@angular/core/testing';

import { MapasUsuarioResolverService } from './mapas-usuario-resolver.service';

describe('MapasUsuarioResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapasUsuarioResolverService]
    });
  });

  it('should be created', inject([MapasUsuarioResolverService], (service: MapasUsuarioResolverService) => {
    expect(service).toBeTruthy();
  }));
});
