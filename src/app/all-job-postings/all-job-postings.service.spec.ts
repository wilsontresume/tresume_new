import { TestBed } from '@angular/core/testing';

import { AllJobPostingsService } from './all-job-postings.service';

describe('AllJobPostingsService', () => {
  let service: AllJobPostingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllJobPostingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
