import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Productservice } from '../service/productservice';
import { Product } from '../models/Product.model';


@Component({
  selector: 'app-addedcart',
  imports: [CommonModule],
  templateUrl: './addedcart.html',
  styleUrl: './addedcart.css'
})
export class Addedcart {
    products: Product[] = [];
  loading = true;
  cartCount: number = 0;

  constructor(private router: Router,private productService: Productservice) {}

  navigateToCarthome() {
    this.router.navigate(['/carthome']);
  }
  
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
}
