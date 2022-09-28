import { TestBed } from '@angular/core/testing';

import { LetterStateIdentifierService } from './letter-state-identifier.service';

describe('LetterStateIdentifierService', () => {
  let service: LetterStateIdentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterStateIdentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
