import { TestBed, inject } from '@angular/core/testing';

import { VentasPagosService } from './ventas-pagos.service';

describe('VentasPagosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentasPagosService]
    });
  });

  it('should be created', inject([VentasPagosService], (service: VentasPagosService) => {
    expect(service).toBeTruthy();
  }));
});
