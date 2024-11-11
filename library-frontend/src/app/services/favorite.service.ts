import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:8000/api';
  
  private isFavoriteSubject = new BehaviorSubject<boolean>(false);
  isFavorite$ = this.isFavoriteSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  addFavorite(bookId: number, userId: number) {
    return this.http.post(`${this.apiUrl}/books/${bookId}/favorites/add/`, {userId}).pipe(
        tap(() => this.isFavoriteSubject.next(true))
      );
  }
  
  removeFavorite(bookId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/favorites/${bookId}/`).pipe(
        tap(() => this.isFavoriteSubject.next(false))
      );
  }
  
  getFavorites(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/favorites/${userId}`);
  }
  
  isFavorite(bookId: number, userId: number): Observable<{ is_favorite: boolean }> {
    return this.http.get<{ is_favorite: boolean }>(`${this.apiUrl}/${userId}/favorites/check/${bookId}/`).pipe(
        tap(response => this.isFavoriteSubject.next(response.is_favorite))
      );
  }
}
