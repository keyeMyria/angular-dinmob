import { TestBed, inject } from '@angular/core/testing';

import { PagoTrabajadorService } from './pago-trabajador.service';

describe('PagoTrabajadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagoTrabajadorService]
    });
  });

  it('should be created', inject([PagoTrabajadorService], (service: PagoTrabajadorService) => {
    expect(service).toBeTruthy();
  }));
});
