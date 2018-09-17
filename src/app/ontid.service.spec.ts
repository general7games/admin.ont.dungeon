import { TestBed } from '@angular/core/testing';

import { OntidService } from './ontid.service';

describe('OntidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OntidService = TestBed.get(OntidService);
    expect(service).toBeTruthy();
  });
});
