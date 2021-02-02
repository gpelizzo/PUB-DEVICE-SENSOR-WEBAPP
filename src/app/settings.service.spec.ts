import { TestBed } from '@angular/core/testing';

import { CSettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: CSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
