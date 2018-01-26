import { TestBed, inject } from '@angular/core/testing';

import { EstadosVentaLoteResolverService } from './estados-venta-lote-resolver.service';

describe('EstadosVentaLoteResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadosVentaLoteResolverService]
    });
  });

  it('should be created', inject([EstadosVentaLoteResolverService], (service: EstadosVentaLoteResolverService) => {
    expect(service).toBeTruthy();
  }));
});
