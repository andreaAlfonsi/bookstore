import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart: any;
  userId: number | null = null;
  total: number = 0;

  constructor(private cartService: CartService, private accountService: AccountService) {}

  ngOnInit(): void {
	this.userId = this.accountService.getUserId();
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart(Number(this.userId)).subscribe((data) => {
	this.cart = data; 
	this.total = this.cart.items.reduce((sum: number, item: any) => sum + item.total_price, 0);
	});	
  }

  removeFromCart(bookId: number): void {
    this.cartService.removeFromCart(bookId, Number(this.userId)).subscribe(() => this.loadCart());
  }
  
  updateQuantity(bookId: number): void {
    // Aggiorna la quantità dell'articolo
    this.cartService.updateCart(bookId, Number(this.userId));
  }
  
  proceedToCheckout(): void {
    // Logica per il checkout, es. navigazione a una pagina di checkout
    console.log("Procedi al checkout");
  }
}
