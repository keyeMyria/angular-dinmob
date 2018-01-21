import { TestBed, inject } from '@angular/core/testing';

import { ObrasUsuarioResolverService } from './obras-usuario-resolver.service';

describe('ObrasUsuarioResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObrasUsuarioResolverService]
    });
  });

  it('should be created', inject([ObrasUsuarioResolverService], (service: ObrasUsuarioResolverService) => {
    expect(service).toBeTruthy();
  }));
});
