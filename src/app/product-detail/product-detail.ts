import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product.model';
import { Productservice } from '../service/productservice';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  product?: Product;
  selectedSize: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: Productservice
  ) {}

  ngOnInit() {
    // First try to get from cache (set by search component)
    const cached = this.productService.getCurrentProduct();
    if (cached) {
      this.product = cached;
      // Pre-select the first size if available
      if (this.product.sizes && this.product.sizes.length > 0) {
        this.selectedSize = this.product.sizes[0];
        this.product.selectedSize = this.selectedSize;
      }
      return;
    }

    // Fallback to API using route parameter
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id) && id > 0) {
        this.fetchProduct(id);
      }
    });
  }

  private fetchProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        // Pre-select the first size if available
        if (this.product.sizes && this.product.sizes.length > 0) {
          this.selectedSize = this.product.sizes[0];
          this.product.selectedSize = this.selectedSize;
        }
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.product = undefined;
      }
    });
  }

  selectSize(size: string) {
    this.selectedSize = size;
    if (this.product) {
      this.product.selectedSize = size;
    }
  }

  addToCart() {
    if (!this.product) return;

   

    // Ensure product has selected size and quantity
    this.product.selectedSize = this.selectedSize;
    this.product.quantity = this.product.quantity || 1;

    this.productService.addToCart(this.product);
    alert('Product added to cart!');
    
    // Optionally navigate to cart page
    // this.navigateToCart();
  }

  increaseQuantity() {
    if (this.product) {
      this.product.quantity = (this.product.quantity || 0) + 1;
    }
  }

  decreaseQuantity() {
    if (this.product && this.product.quantity > 1) {
      this.product.quantity--;
    }
  }

  // ✅ Add public method for template to call
  navigateToCarthome() {
    this.router.navigate(['/carthome']);
  }

  // ✅ Optional: Add method for cart navigation
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}