import { TestBed, inject } from '@angular/core/testing';

import { ObraManzanasTrabajadoresResidentesResolverService } from './obra-manzanas-trabajadores-residentes-resolver.service';

describe('ObraManzanasTrabajadoresResidentesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObraManzanasTrabajadoresResidentesResolverService]
    });
  });

  it('should be created', inject([ObraManzanasTrabajadoresResidentesResolverService], (service: ObraManzanasTrabajadoresResidentesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
