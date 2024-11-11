import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBuddyComponent } from './book-buddy.component';

describe('BookBuddyComponent', () => {
  let component: BookBuddyComponent;
  let fixture: ComponentFixture<BookBuddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookBuddyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
