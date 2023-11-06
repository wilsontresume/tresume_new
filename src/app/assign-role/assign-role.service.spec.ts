import { TestBed } from '@angular/core/testing';

import { AssignRoleService } from './assign-role.service';

describe('AssignRoleService', () => {
  let service: AssignRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
