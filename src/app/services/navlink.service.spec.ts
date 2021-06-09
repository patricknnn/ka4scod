import { TestBed } from '@angular/core/testing';

import { NavlinkService } from './navlink.service';

describe('NavlinkService', () => {
  let service: NavlinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavlinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
