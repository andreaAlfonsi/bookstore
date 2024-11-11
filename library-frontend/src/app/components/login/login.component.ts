import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private accountService: AccountService, private http: HttpClient, private router: Router) {}

  login(): void {this.http.post<any>('http://localhost:8000/api/token/', this.credentials)
      .subscribe(
        response => {
		  this.accountService.login(response.access)
          alert('Login effettuato con successo!');
		  this.router.navigate(['']);
        },
        error => alert('Credenziali non valide')
      );
  }
}