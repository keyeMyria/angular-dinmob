import { TestBed, inject } from '@angular/core/testing';

import { EspecialidadesTrabajadorResolverService } from './especialidades-trabajador-resolver.service';

describe('EspecialidadesTrabajadorResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspecialidadesTrabajadorResolverService]
    });
  });

  it('should be created', inject([EspecialidadesTrabajadorResolverService], (service: EspecialidadesTrabajadorResolverService) => {
    expect(service).toBeTruthy();
  }));
});
