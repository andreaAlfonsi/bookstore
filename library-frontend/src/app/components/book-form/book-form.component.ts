import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { AccountService } from '../../services/account.service'
import { CommonModule} from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})

export class BookFormComponent implements OnInit {
	
  isAdmin$!: Observable<boolean>;
  
  @Input() book: Book | null = null;
  @Output() formSubmit = new EventEmitter<Book>();
  
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private bookService: BookService, private accountService: AccountService) {
    this.bookForm = this.fb.group({
      titolo: ['', Validators.required],
      autore: ['', Validators.required],
      anno_pubblicazione: [null, Validators.required],
      prezzo: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
	this.isAdmin$ = new BehaviorSubject<boolean>(this.accountService.is_Admin());
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      this.formSubmit.emit(bookData);
	  this.bookForm.reset();
    }
  }

}