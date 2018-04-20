import { TestBed, inject } from '@angular/core/testing';

import { EstadosPedidoResolverService } from './estados-pedido-resolver.service';

describe('EstadosPedidoResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadosPedidoResolverService]
    });
  });

  it('should be created', inject([EstadosPedidoResolverService], (service: EstadosPedidoResolverService) => {
    expect(service).toBeTruthy();
  }));
});
