import { TestBed, inject } from '@angular/core/testing';

import { ObraMaterialesTrabajadoresResidentesResolverService } from './obra-materiales-trabajadores-residentes-resolver.service';

describe('ObraMaterialesTrabajadoresResidentesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObraMaterialesTrabajadoresResidentesResolverService]
    });
  });

  it('should be created', inject([ObraMaterialesTrabajadoresResidentesResolverService], (service: ObraMaterialesTrabajadoresResidentesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
