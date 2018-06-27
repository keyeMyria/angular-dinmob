import { TestBed, inject } from '@angular/core/testing';

import { ManzanasResolverService } from './manzanas-resolver.service';

describe('ManzanasResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManzanasResolverService]
    });
  });

  it('should be created', inject([ManzanasResolverService], (service: ManzanasResolverService) => {
    expect(service).toBeTruthy();
  }));
});
