import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AccountService } from '../../services/account.service';
import { FavoriteService } from '../../services/favorite.service';
import { Book } from '../../models/book.model';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.css'
})
export class FavoriteListComponent implements OnInit{
	
  favorites: Book[] = [];
  userId: number | null = null;
  constructor(private favoriteService: FavoriteService, private accountService: AccountService) {  }
  
  ngOnInit(): void {
	this.userId = this.accountService.getUserId();	
	this.loadFavorites();
  }
  
  loadFavorites(): void {
    this.favoriteService.getFavorites(Number(this.userId)).subscribe((data: Book[]) => {
	  this.favorites = data;
	});
  }
}
