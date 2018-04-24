import { TestBed, inject } from '@angular/core/testing';

import { UsuariosResolverService } from './usuarios-resolver.service';

describe('UsuariosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuariosResolverService]
    });
  });

  it('should be created', inject([UsuariosResolverService], (service: UsuariosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
