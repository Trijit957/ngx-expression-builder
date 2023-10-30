import { TestBed } from '@angular/core/testing';

import { NgQueryBuilderService } from './ng-query-builder.service';

describe('NgQueryBuilderService', () => {
  let service: NgQueryBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgQueryBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
