import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productservice } from '../service/productservice';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-addedcart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addedcart.html',
  styleUrls: ['./addedcart.css']
})
export class Addedcart implements OnInit {
  cartItems: Product[] = [];
  cartCount: number = 0;
  totalAmount: number = 0;

  constructor(private router: Router, private productService: Productservice) {}

  ngOnInit(): void {
    this.productService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
    
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  increaseQuantity(product: Product) {
    this.productService.updateCartItemQuantity(product.id, product.selectedSize, product.quantity + 1);
  }

  decreaseQuantity(product: Product) {
    this.productService.updateCartItemQuantity(product.id, product.selectedSize, product.quantity - 1);
  }

  removeItem(product: Product) {
    this.productService.removeFromCart(product.id, product.selectedSize);
  }

  navigateToCarthome() {
    this.router.navigate(['/carthome']);
  }

  continueShopping() {
    this.router.navigate(['/carthome']);
  }

  checkout() {
    alert('Checkout functionality will be implemented soon!');
  }
}