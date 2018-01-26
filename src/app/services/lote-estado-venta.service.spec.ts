import { TestBed, inject } from '@angular/core/testing';

import { LoteEstadoVentaService } from './lote-estado-venta.service';

describe('LoteEstadoVentaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoteEstadoVentaService]
    });
  });

  it('should be created', inject([LoteEstadoVentaService], (service: LoteEstadoVentaService) => {
    expect(service).toBeTruthy();
  }));
});
