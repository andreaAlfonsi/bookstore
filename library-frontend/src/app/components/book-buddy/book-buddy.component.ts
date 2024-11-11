import { Component, Input, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { BookService } from '../../services/book.service';
import { BookBuddyService } from '../../services/book-buddy.service';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-buddy',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './book-buddy.component.html',
  styleUrl: './book-buddy.component.css'
})
export class BookBuddyComponent implements OnInit {
  book: Book | null = null;
  messages: { role: string; content: string }[] = [];
  userMessage: string = '';  
  
   constructor(
     private bookService: BookService, 
     private bookBuddyService: BookBuddyService,     
     private route: ActivatedRoute,
    ) {}
   
   ngOnInit(): void {
	   const bookId = this.route.snapshot.paramMap.get('id');
	   if (bookId) {
          this.bookService.getBookById(+bookId).subscribe((data: Book) => {
          this.book = data;
		  this.bookBuddyService.sendMessage(data.titolo, data.autore,'').subscribe(
			  (response) => {
				this.messages.push({ role: 'ai', content: response.response });
			  },
			  (error) => {
				console.error('Error:', error);
			  }
			);
            });
	  
	  this.bookBuddyService.sendMessage(this.book!.titolo, this.book!.autore,'').subscribe(
      (response) => {
        this.messages.push({ role: 'ai', content: response.response });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    }	  
   }
   
   sendMessage(userMessage: string) {
    if (!userMessage) return;

    this.messages.push({ role: 'user', content: userMessage });

    this.bookBuddyService.sendMessage(this.book!.titolo, this.book!.autore, userMessage).subscribe(
      (response) => {
        this.messages.push({ role: 'ai', content: response.response });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
	this.userMessage = '';
  }
}
