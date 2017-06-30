import { TestBed, inject } from '@angular/core/testing';

import { LotesService } from './lotes.service';

describe('LotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LotesService]
    });
  });

  it('should be created', inject([LotesService], (service: LotesService) => {
    expect(service).toBeTruthy();
  }));
});
