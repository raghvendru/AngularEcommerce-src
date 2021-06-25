import { TestBed } from '@angular/core/testing';

import { ReturnServiceService } from './return-service.service';

describe('ReturnServiceService', () => {
  let service: ReturnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
