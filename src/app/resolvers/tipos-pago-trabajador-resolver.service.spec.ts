import { TestBed, inject } from '@angular/core/testing';

import { TiposPagoTrabajadorResolverService } from './tipos-pago-trabajador-resolver.service';

describe('TiposPagoTrabajadorResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposPagoTrabajadorResolverService]
    });
  });

  it('should be created', inject([TiposPagoTrabajadorResolverService], (service: TiposPagoTrabajadorResolverService) => {
    expect(service).toBeTruthy();
  }));
});
