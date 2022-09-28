import { TestBed } from '@angular/core/testing';

import { PuzzleCreatorService } from './puzzle-creator.service';

describe('PuzzleCreatorService', () => {
  let service: PuzzleCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
