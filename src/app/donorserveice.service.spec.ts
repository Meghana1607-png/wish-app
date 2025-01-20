import { TestBed } from '@angular/core/testing';

import { DonorserveiceService } from './donorserveice.service';

describe('DonorserveiceService', () => {
  let service: DonorserveiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonorserveiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
