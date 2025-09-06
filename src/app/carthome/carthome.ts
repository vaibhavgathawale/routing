import { Component,Injectable,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productservice } from '../service/productservice';
import { Product } from '../models/Product.model';




@Component({
  selector: 'app-carthome',
  standalone: true,               // ✅ Needed for Angular 20 standalone component
  imports: [CommonModule],
  templateUrl: './carthome.html',
  styleUrl: './carthome.css'
})

export class Carthome implements OnInit {

  products: Product[] = [];
  loading = true;
  

  constructor(private productService: Productservice) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log(data)
        this.products = data;
        this.loading = false;
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
    // Call your cart service here
  }
}

