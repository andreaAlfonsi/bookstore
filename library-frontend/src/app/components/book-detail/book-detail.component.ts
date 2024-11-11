import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AccountService } from '../../services/account.service';
import { CartService } from '../../services/cart.service';
import { Book } from '../../models/book.model';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewListComponent } from '../review-list/review-list.component';
import { AddFavoriteComponent } from '../add-favorite/add-favorite.component';
import { BookBuddyComponent } from '../book-buddy/book-buddy.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, ReviewListComponent, AddFavoriteComponent, BookBuddyComponent,],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{

  book: Book | null = null;
  isLoggedIn$!: Observable<boolean>;
  userId: number | null = null;
  quantity: number = 1; // Quantità predefinita
  
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
	private accountService: AccountService,
    private cartService: CartService,
  ) {}
  
  ngOnInit(): void {
	this.isLoggedIn$ = this.accountService.isLoggedIn$;
    const bookId = this.route.snapshot.paramMap.get('id');
	this.userId = this.accountService.getUserId();	
    if (bookId) {
      this.bookService.getBookById(+bookId).subscribe((data: Book) => {
        this.book = data;
      });
    }
  }
  
  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.book.id, Number(this.userId), this.quantity).subscribe(
        () => {
          alert(`${this.book!.titolo} aggiunto al carrello!`);
        },
        (error) => {
          console.error('Errore aggiungendo al carrello', error);
        }
      );
    }
  }
}
