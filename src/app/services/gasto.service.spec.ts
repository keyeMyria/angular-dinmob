import { TestBed, inject } from '@angular/core/testing';

import { GastoService } from './gasto.service';

describe('GastoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GastoService]
    });
  });

  it('should be created', inject([GastoService], (service: GastoService) => {
    expect(service).toBeTruthy();
  }));
});
