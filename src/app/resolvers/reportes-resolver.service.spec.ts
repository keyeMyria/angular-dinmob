import { TestBed, inject } from '@angular/core/testing';

import { ReportesResolverService } from './reportes-resolver.service';

describe('ReportesResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportesResolverService]
    });
  });

  it('should be created', inject([ReportesResolverService], (service: ReportesResolverService) => {
    expect(service).toBeTruthy();
  }));
});
