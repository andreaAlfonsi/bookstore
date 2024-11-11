import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
		
  private apiUrl = 'http://127.0.0.1:8000/api/account/';
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private admin = new BehaviorSubject<boolean>(!!localStorage.getItem('isAdmin'));
  private userId = new BehaviorSubject<any>(localStorage.getItem('userId'));
  
  isLoggedIn$ = this.loggedIn.asObservable();
  isAdmin$ = this.admin.asObservable();
  user_Id$ = this.userId.asObservable();


  login(token: string): void {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', tokenPayload.is_admin);
	localStorage.setItem('userId', tokenPayload.user_id);
    this.loggedIn.next(true);
	this.admin.next(tokenPayload.is_admin);
	this.userId.next(tokenPayload.user_id);
  }
  
  getUserId(): number {
	  return Number(localStorage.getItem('userId'));
  }

  is_Admin(): any {
    return localStorage.getItem('isAdmin')==='true';
  }
  
  logout(): void {
    localStorage.removeItem('token');
	localStorage.removeItem('isAdmin');
    this.loggedIn.next(false);
	this.userId.next(0);
  }
}