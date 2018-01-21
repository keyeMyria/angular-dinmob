import { TestBed, inject } from '@angular/core/testing';

import { UsuariosAlmacenistasResolverService } from './usuarios-almacenistas-resolver.service';

describe('UsuariosAlmacenistasResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuariosAlmacenistasResolverService]
    });
  });

  it('should be created', inject([UsuariosAlmacenistasResolverService], (service: UsuariosAlmacenistasResolverService) => {
    expect(service).toBeTruthy();
  }));
});
