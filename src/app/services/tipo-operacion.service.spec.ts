import { TestBed, inject } from '@angular/core/testing';

import { TipoOperacionService } from './tipo-operacion.service';

describe('TipoOperacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoOperacionService]
    });
  });

  it('should be created', inject([TipoOperacionService], (service: TipoOperacionService) => {
    expect(service).toBeTruthy();
  }));
});
