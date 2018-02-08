import { TestBed, inject } from '@angular/core/testing';

import { UsuarioLoggedResolverService } from './usuario-logged-resolver.service';

describe('UsuarioLoggedResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioLoggedResolverService]
    });
  });

  it('should be created', inject([UsuarioLoggedResolverService], (service: UsuarioLoggedResolverService) => {
    expect(service).toBeTruthy();
  }));
});
