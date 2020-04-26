import { TestBed } from '@angular/core/testing';

import { GlobalCoronaServiceService } from './global-corona-service.service';

describe('GlobalCoronaServiceService', () => {
  let service: GlobalCoronaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCoronaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
