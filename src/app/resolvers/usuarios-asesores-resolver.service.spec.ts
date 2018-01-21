import { TestBed, inject } from '@angular/core/testing';

import { UsuariosAsesoresResolverService } from './usuarios-asesores-resolver.service';

describe('UsuariosAsesoresResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuariosAsesoresResolverService]
    });
  });

  it('should be created', inject([UsuariosAsesoresResolverService], (service: UsuariosAsesoresResolverService) => {
    expect(service).toBeTruthy();
  }));
});
