import { TestBed, inject } from '@angular/core/testing';

import { EstadisticasAdminResolverService } from './estadisticas-admin-resolver.service';

describe('EstadisticasAdminResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadisticasAdminResolverService]
    });
  });

  it('should be created', inject([EstadisticasAdminResolverService], (service: EstadisticasAdminResolverService) => {
    expect(service).toBeTruthy();
  }));
});
