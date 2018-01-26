import { TestBed, inject } from '@angular/core/testing';

import { InstitucionesCreditoResolverService } from './instituciones-credito-resolver.service';

describe('InstitucionesCreditoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InstitucionesCreditoResolverService]
    });
  });

  it('should be created', inject([InstitucionesCreditoResolverService], (service: InstitucionesCreditoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
