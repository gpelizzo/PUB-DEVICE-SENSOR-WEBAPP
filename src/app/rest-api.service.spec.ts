import { TestBed } from '@angular/core/testing';

import { CRestApiService } from './rest-api.service';

describe('CRestApi', () => {
  let service: CRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
