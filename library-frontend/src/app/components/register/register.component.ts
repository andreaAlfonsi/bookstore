import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private regUrl = 'http://localhost:8000/api/register/'
  user = { username: '', email: '', password: '', role: 'user' }; // Ruolo predefinito 'user'

  constructor(private http: HttpClient, private router: Router) {  }

  register(): void {
    this.http.post<any>(this.regUrl, this.user)
      .subscribe(
        response => {
		  alert('Registrazione completata!');
		  this.router.navigate(['/login']);
		},  // Successo
        error => alert('Errore durante la registrazione')  // Errore
      );
  }
}