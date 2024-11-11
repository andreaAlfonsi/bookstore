import { TestBed } from '@angular/core/testing';

import { BookBuddyService } from './book-buddy.service';

describe('BookBuddyService', () => {
  let service: BookBuddyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookBuddyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
