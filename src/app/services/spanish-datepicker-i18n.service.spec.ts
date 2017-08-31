import { TestBed, inject } from '@angular/core/testing';

import { SpanishDatepickerI18nService } from './spanish-datepicker-i18n.service';

describe('SpanishDatepickerI18nService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpanishDatepickerI18nService]
    });
  });

  it('should be created', inject([SpanishDatepickerI18nService], (service: SpanishDatepickerI18nService) => {
    expect(service).toBeTruthy();
  }));
});
