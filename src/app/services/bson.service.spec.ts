import { TestBed } from '@angular/core/testing';

import { BSONService } from './bson.service';

describe('BSONService', () => {
  let service: BSONService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BSONService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
