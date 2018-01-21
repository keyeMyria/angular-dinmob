import { TestBed, inject } from '@angular/core/testing';

import { UsuariosContolAlmacenResolverService } from './usuarios-contol-almacen-resolver.service';

describe('UsuariosContolAlmacenResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuariosContolAlmacenResolverService]
    });
  });

  it('should be created', inject([UsuariosContolAlmacenResolverService], (service: UsuariosContolAlmacenResolverService) => {
    expect(service).toBeTruthy();
  }));
});
