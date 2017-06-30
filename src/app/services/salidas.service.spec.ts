import { TestBed, inject } from '@angular/core/testing';

import { SalidasService } from './salidas.service';

describe('SalidasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalidasService]
    });
  });

  it('should be created', inject([SalidasService], (service: SalidasService) => {
    expect(service).toBeTruthy();
  }));
});
