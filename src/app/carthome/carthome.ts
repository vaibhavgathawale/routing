import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Productservice } from '../service/productservice';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-carthome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carthome.html',
  styleUrls: ['./carthome.css']
})
export class Carthome implements OnInit {
  products: Product[] = [];
  loading = true;
  cartCount: number = 0;

  constructor(
    private productService: Productservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Use setTimeout to avoid change detection issues
    setTimeout(() => {
      this.productService.loadCartFromStorage();
      this.fetchProducts();
    });
    
    this.productService.cartCount$.subscribe(count => {
      this.cartCount = count;
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  fetchProducts() {
    this.loading = true;
    this.productService.loadProducts();
    
    this.productService.products$.subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        quantity: 0, // Initialize quantity to 0
        selectedSize: product.selectedSize || ''
      }));
      this.loading = false;
      
      // After loading products, update their quantities from cart
      const cartItems = this.productService.getCartItems();
      this.updateProductQuantities(cartItems);
      this.cdr.detectChanges(); // Manually trigger change detection
    });
  }

  // Update product quantities based on cart items
  private updateProductQuantities(cartItems: Product[]): void {
    this.products = this.products.map(product => {
      const cartItem = cartItems.find(item => 
        item.id === product.id && item.selectedSize === product.selectedSize
      );
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 0
      };
    });
  }

  selectSize(product: Product, size: string) {
    product.selectedSize = size;
    
    // Update quantity if this size is already in cart
    const cartItems = this.productService.getCartItems();
    const cartItem = cartItems.find(item => 
      item.id === product.id && item.selectedSize === size
    );
    
    if (cartItem) {
      product.quantity = cartItem.quantity;
    } else {
      product.quantity = 0;
    }
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  addToCart(product: Product) {
    
    
    // Set initial quantity if not set
    if (!product.quantity || product.quantity === 0) {
      product.quantity = 1;
    }
    
    this.productService.addToCart(product);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  increaseQty(product: Product) {
    
    
    product.quantity = (product.quantity || 0) + 1;
    this.productService.addToCart(product);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  decreaseQty(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
      this.productService.addToCart(product);
    } else if (product.quantity === 1) {
      // Remove from cart if quantity becomes 0
      this.productService.removeFromCart(product.id, product.selectedSize);
      product.quantity = 0;
    }
    this.cdr.detectChanges(); // Manually trigger change detection
  }
}