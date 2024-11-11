import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = 'http://127.0.0.1:8000/api/books/';

    constructor(private http: HttpClient) {}
 
	getBooks(filterParams?: any, orderBy?: string): Observable<Book[]> {
		let params = new HttpParams();

		// Aggiungi parametri di filtro e ordinamento se presenti
		if (filterParams) {
			Object.keys(filterParams).forEach(key => {
				if (filterParams[key]) { // Controlla se il filtro non è vuoto
					params = params.set(key, filterParams[key]);
				}
			});
		}
		if (orderBy) {
			params = params.set('ordering', orderBy);
		}

		return this.http.get<Book[]>(this.apiUrl, { params });
	}

    /*getBooks(filters: any = {}): Observable<Book[]> {
		const token = localStorage.getItem('token');
		const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const params = new HttpParams({ fromObject: filters });
		return this.http.get<Book[]>(this.apiUrl, {headers, params });
		return this.http.get<Book[]>(this.apiUrl);   // Nessun header di autenticazione richiesto
    }*/

    getBook(id: number): Observable<Book> {
        return this.http.get<Book>(`${this.apiUrl}${id}/`);
    }

    createBook(book: Book): Observable<Book> {
        return this.http.post<Book>(this.apiUrl, book);
    }

    updateBook(book: Book): Observable<Book> {
        return this.http.put<Book>(`${this.apiUrl}${book.id}/`, book);
    }

    deleteBook(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`);
    }
	
	getBookById(id: number): Observable<Book> {
		return this.http.get<Book>(`${this.apiUrl}${id}/`);
	}
}