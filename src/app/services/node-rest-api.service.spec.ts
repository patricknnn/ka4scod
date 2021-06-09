import { TestBed } from '@angular/core/testing';

import { NodeRestApiService } from './node-rest-api.service';

describe('NodeRestApiService', () => {
  let service: NodeRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
