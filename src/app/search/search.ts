import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Data } from '../service/data';
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

  constructor(
    private data: Data,
    private productService: Productservice,
    private router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(value => {
          if (value && value.length >= 1) {
            return this.data.searchWords(value);
          } else {
            this.results = [];
            return of([]); // ✅ use observable instead of []
          }
        })
      )
      .subscribe({
        next: (data: Product[]) => (this.results = data),
        error: (err) => console.error('Error fetching search results:', err)
      });
  }

  selectProduct(product: Product) {
  this.router.navigate(['/product', product.id], { state: { product } });
}

}
