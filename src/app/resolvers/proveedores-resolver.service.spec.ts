import { TestBed, inject } from '@angular/core/testing';

import { ProveedoresResolverService } from './proveedores-resolver.service';

describe('ProveedoresResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProveedoresResolverService]
    });
  });

  it('should be created', inject([ProveedoresResolverService], (service: ProveedoresResolverService) => {
    expect(service).toBeTruthy();
  }));
});
