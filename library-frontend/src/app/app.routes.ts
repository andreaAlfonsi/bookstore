import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'favorites', component: FavoriteListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent}
];
