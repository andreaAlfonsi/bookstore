import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'
import { AccountService } from '../../services/account.service';
import { CommonModule} from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
	
  isLoggedIn$!: Observable<boolean>;
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.accountService.isLoggedIn$;
  }
  
  logout(): void {
    this.accountService.logout();
	alert('Logout effettuato con successo!');
	this.router.navigate(['/']);
    window.location.reload();
    
  }
}
