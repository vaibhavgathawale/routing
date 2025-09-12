import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product } from '../models/Product.model';
import { Productservice } from '../service/productservice';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  searchControl = new FormControl('');
  results: Product[] = [];
  loading: boolean = false;

  constructor(
    private productService: Productservice,
    private router: Router
  ) {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.length >= 1) {
            this.loading = true;
            return this.productService.searchProducts(value);
          } else {
            this.results = [];
            this.loading = false;
            return of([]);
          }
        })
      )
      .subscribe({
        next: (data: Product[]) => {
          this.results = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching search results:', err);
          this.loading = false;
          this.results = [];
        }
      });
  }

  selectProduct(product: Product) {
    this.productService.setSelectedProduct(product);
    this.results = [];
    this.searchControl.setValue('', { emitEvent: false });
    
    // Navigate to product detail page
    this.router.navigate(['/product', product.id]);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.results = [];
  }
}