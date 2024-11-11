import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://localhost:8000/api';
  
  constructor(private http: HttpClient) { }
  
  addReview(bookId: number, userId: number, rating: number, comment: string) {
    return this.http.post(`${this.apiUrl}/books/${bookId}/reviews/create/`, { userId, rating, comment });
  }

  getReviews(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/books/${bookId}/reviews/`);
  }
}
