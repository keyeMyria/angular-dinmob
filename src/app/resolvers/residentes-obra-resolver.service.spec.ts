import { TestBed, inject } from '@angular/core/testing';

import { ResidentesObraResolverService } from './residentes-obra-resolver.service';

describe('ResidentesObraResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidentesObraResolverService]
    });
  });

  it('should be created', inject([ResidentesObraResolverService], (service: ResidentesObraResolverService) => {
    expect(service).toBeTruthy();
  }));
});
