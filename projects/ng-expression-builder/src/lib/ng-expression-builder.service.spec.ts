import { TestBed } from '@angular/core/testing';

import { NgExpressionBuilderService } from './ng-expression-builder.service';

describe('NgExpressionBuilderService', () => {
  let service: NgExpressionBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgExpressionBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
