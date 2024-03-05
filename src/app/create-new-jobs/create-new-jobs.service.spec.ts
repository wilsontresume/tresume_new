import { TestBed } from '@angular/core/testing';

import { CreateNewJobsService } from './create-new-jobs.service';

describe('CreateNewJobsService', () => {
  let service: CreateNewJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
