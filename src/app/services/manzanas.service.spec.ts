import { TestBed, inject } from '@angular/core/testing';

import { ManzanasService } from './manzanas.service';

describe('ManzanasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManzanasService]
    });
  });

  it('should be created', inject([ManzanasService], (service: ManzanasService) => {
    expect(service).toBeTruthy();
  }));
});
