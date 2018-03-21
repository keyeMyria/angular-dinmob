import { TestBed, inject } from '@angular/core/testing';

import { TrabajadoresResolverService } from './trabajadores-resolver.service';

describe('TrabajadoresResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrabajadoresResolverService]
    });
  });

  it('should be created', inject([TrabajadoresResolverService], (service: TrabajadoresResolverService) => {
    expect(service).toBeTruthy();
  }));
});
