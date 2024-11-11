// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/cart/';

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${userId}/`);
  }

  addToCart(bookId: number, userId: number, quantity: number = 1): Observable<any> {
    return this.http.post(this.apiUrl, { book_id: bookId, user_id: userId, quantity });
  }

  updateCart(bookId: number, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${bookId}/`, { quantity });
  }

  removeFromCart(bookId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${userId}/${bookId}/`);
  }
}
