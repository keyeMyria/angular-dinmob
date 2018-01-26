import { TestBed, inject } from '@angular/core/testing';

import { TipoPagoService } from './tipo-pago.service';

describe('TipoPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoPagoService]
    });
  });

  it('should be created', inject([TipoPagoService], (service: TipoPagoService) => {
    expect(service).toBeTruthy();
  }));
});
