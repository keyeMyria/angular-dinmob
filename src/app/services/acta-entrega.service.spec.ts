import { TestBed, inject } from '@angular/core/testing';

import { ActaEntregaService } from './acta-entrega.service';

describe('ActaEntregaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActaEntregaService]
    });
  });

  it('should be created', inject([ActaEntregaService], (service: ActaEntregaService) => {
    expect(service).toBeTruthy();
  }));
});
