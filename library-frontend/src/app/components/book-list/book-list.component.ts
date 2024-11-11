import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { AccountService } from '../../services/account.service'
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-book-list',
    standalone: true,
	imports: [CommonModule, BookFormComponent, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
    isAdmin$!: Observable<boolean>;
	books: Book[] = [];
	//selectedBook: Book | null = null;
	filterCriteria = { autore: null, anno_pubblicazione: null };
	sortCriteria = '';
	editingBookId: number | null = null;
    editedBook: Book | null = null;
	
	constructor(private bookService: BookService, private accountService: AccountService) {}
	
	ngOnInit(): void {
	  this.isAdmin$ = new BehaviorSubject<boolean>(this.accountService.is_Admin());
      this.loadBooks();
	}
	
	loadBooks(): void {
		this.bookService.getBooks().subscribe((data: Book[]) => {
		  this.books = data;
		});
	}
	
	addBook(book: Book): void {
		this.bookService.createBook(book).subscribe(() => {
		  this.loadBooks();
		});
    }
	onEdit(book: Book): void {
		console.log(book);
		this.editedBook = book;
		this.editingBookId = book.id;
	}
	onSave(): void {
		if (this.editedBook) {
		  this.bookService.updateBook(this.editedBook!).subscribe(() => {
			this.loadBooks(); // Ricarica la lista dei libri
			this.onCancel(); // Annulla la modalità di modifica
		  });
		}
	  }
  
	onCancel(): void {
		this.editingBookId = null;
		this.editedBook = null;
	  }

	updateBook(book: Book): void {
		this.bookService.updateBook(this.editedBook!).subscribe(() => {
			this.loadBooks();
		});
    }
  
	deleteBook(id: number): void {
		this.bookService.deleteBook(id).subscribe(() => {
		  this.loadBooks();
		});
	}
  
  applyFilters(): void {
		this.bookService.getBooks(this.filterCriteria).subscribe((data: Book[]) => {
		  this.books = data;
		  this.sortCriteria = '';
	  });
	}

  applySort(): void {
	   this.bookService.getBooks({ ...this.filterCriteria, ordering: this.sortCriteria })
		.subscribe((data: Book[]) => {
		  this.books = data;
		});
	}
	resetFilters() {
		this.filterCriteria = {autore: null, anno_pubblicazione: null};  // Resetta i parametri di filtro
		this.sortCriteria = '';
		this.applyFilters(); // Esegui la richiesta senza filtri
	}
}
