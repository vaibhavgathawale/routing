import { Component,Injectable,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productservice } from '../service/productservice';
import { Product } from '../models/Product.model';
import { RouterModule } from '@angular/router';   // ✅ Import this




@Component({
  selector: 'app-carthome',
  standalone: true,               // ✅ Needed for Angular 20 standalone component
  imports: [CommonModule,RouterModule],
  templateUrl: './carthome.html',
  styleUrl: './carthome.css'
})

export class Carthome implements OnInit {

  products: Product[] = [];
  loading = true;
  cartCount: number = 0;


  constructor(private productService: Productservice) {}

  ngOnInit(): void {
        this.fetchProducts(); // ✅ Call this to load products

    // subscribe to shared products
    this.productService.products$.subscribe(data => 
      {
        this.loading = false;
        this.products = data});
    this.productService.cartCount$.subscribe(count => this.cartCount = count);
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        // console.log(data)
        this.products = data;
        this.loading = true;
        this.productService.loadProducts(); // ✅ This triggers the API call

      },
      error: (err) => {
        console.error('Failed to fetch products', err);
        this.loading = false;
      }
    });
  }

  selectSize(product: Product, size: string) {
    product.selectedSize = size;
  }

  addToCart(product: Product) {
    console.log('Added to cart:', product.name, 'Size:', product.selectedSize);
    if (!product.quantity || product.quantity === 0) {
      product.quantity = 1;
      this.cartCount++;
      this.productService.updateCartCount(this.cartCount);
    }
  }
  increaseQty(product: Product) {
    product.quantity++;
    this.cartCount++;
    this.productService.updateCartCount(this.cartCount);
  }

  decreaseQty(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
      this.cartCount--;
      this.productService.updateCartCount(this.cartCount);

    }
  }
}

