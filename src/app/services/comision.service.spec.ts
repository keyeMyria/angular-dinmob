import { TestBed, inject } from '@angular/core/testing';

import { ComisionService } from './comision.service';

describe('ComisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComisionService]
    });
  });

  it('should be created', inject([ComisionService], (service: ComisionService) => {
    expect(service).toBeTruthy();
  }));
});
