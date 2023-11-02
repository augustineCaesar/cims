import { TestBed } from '@angular/core/testing';

import { BaptismService } from './baptism.service';

describe('BaptismService', () => {
  let service: BaptismService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaptismService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
