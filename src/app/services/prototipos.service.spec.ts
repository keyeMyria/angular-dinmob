import { TestBed, inject } from '@angular/core/testing';

import { PrototiposService } from './prototipos.service';

describe('PrototiposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrototiposService]
    });
  });

  it('should be created', inject([PrototiposService], (service: PrototiposService) => {
    expect(service).toBeTruthy();
  }));
});
