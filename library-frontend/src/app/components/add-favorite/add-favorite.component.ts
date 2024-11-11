import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AccountService } from '../../services/account.service';
import { FavoriteService } from '../../services/favorite.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-favorite',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './add-favorite.component.html',
  styleUrl: './add-favorite.component.css'
})
export class AddFavoriteComponent implements OnInit{
  
  bookId: string | null = null;
  isLoggedIn$!: Observable<boolean>;
  userId: number | null = null;
  isFavorite: boolean = false;
  
  constructor(private favoriteService: FavoriteService, private accountService: AccountService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
	this.bookId = this.route.snapshot.paramMap.get('id');
    this.isLoggedIn$ = this.accountService.isLoggedIn$;
	this.userId = this.accountService.getUserId();	
	// Subscribe to isFavorite$ to get the latest favorite status
    this.favoriteService.isFavorite$.subscribe(isFavorite => {
      this.isFavorite = isFavorite;
    });
	// Initial check for favorite status
    this.favoriteService.isFavorite(Number(this.bookId), Number(this.userId)).subscribe();
  }
  
  addToFavorites() {
    this.favoriteService.addFavorite(Number(this.bookId), Number(this.userId)).subscribe();
	alert('Libro aggiunto ai preferiti');
  }
  
  removeFromFavorites(): void {
    this.favoriteService.removeFavorite(Number(this.bookId), Number(this.userId)).subscribe(() => { });
	alert('Libro rimosso dai preferiti');
  }
  
  /*checkIfFavorite(): void {
    this.favoriteService.isFavorite(Number(this.bookId), Number(this.userId)).subscribe((response) => {
      this.isFavorite$ = response.is_favorite;
    });
  }*/
}
