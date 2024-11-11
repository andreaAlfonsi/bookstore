import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookBuddyService {

  private apiUrl = 'http://localhost:8000/api/book-buddy/';  // Modifica con l'URL del backend

  constructor(private http: HttpClient) {}

  sendMessage(bookTitle: string, bookAuthor: string, message: string): Observable<any> {
    return this.http.post(this.apiUrl, { book_title: bookTitle, book_author: bookAuthor, message });
  }
}
