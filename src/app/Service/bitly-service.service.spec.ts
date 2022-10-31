import { TestBed } from '@angular/core/testing';

import { BitlyService } from './bitly.service';

describe('BitlyServiceService', () => {
  let service: BitlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
