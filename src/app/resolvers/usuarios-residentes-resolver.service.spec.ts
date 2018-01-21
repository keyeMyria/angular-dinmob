import { TestBed, inject } from '@angular/core/testing';

import { UsuariosResidentesResolverService } from './usuarios-residentes-resolver.service';

describe('UsuariosResidentesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuariosResidentesResolverService]
    });
  });

  it('should be created', inject([UsuariosResidentesResolverService], (service: UsuariosResidentesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
