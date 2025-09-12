import { Component, OnInit } from '@angular/core';
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

  constructor(private productService: Productservice) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.productService.loadCartFromStorage();
    
    
    this.productService.cartCount$.subscribe(count => this.cartCount = count);
  }

  fetchProducts() {
    this.loading = true;
    this.productService.loadProducts();
    
    this.productService.products$.subscribe(data => {
      this.products = data;
      this.loading = true;
    });
  }

  selectSize(product: Product, size: string) {
    product.selectedSize = size;
  }

  addToCart(product: Product) {
      
    this.productService.addToCart(product);
  }

  increaseQty(product: Product) {
    
    
    product.quantity = (product.quantity || 0) + 1;
    this.productService.addToCart(product);
  }

  decreaseQty(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
      this.productService.addToCart(product);
    }
  }
}