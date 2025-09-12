import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class Productservice {

  private apiUrl = 'http://localhost:8080/api/products'; // replace with your backend URL

  constructor(private http: HttpClient) {}

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  /** cache for selected product (fix for double click) */
  private selectedProduct: Product | null = null;

  /** Load products once */
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.productsSubject.next(data),
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  /** Get latest snapshot (synchronous) */
  getProductsSnapshot(): Product[] {
    return this.productsSubject.getValue();
  }

  /** Update cart count */
  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /** ✅ Fix: set product in memory + subject */
  setSelectedProduct(product: Product) {
    this.selectedProduct = product; // cache immediately
    this.selectedProductSubject.next(product);
  }

  /** Subject still available if you want async streams */
  private selectedProductSubject = new BehaviorSubject<Product | null>(null);

  getSelectedProduct(): Observable<Product | null> {
    return this.selectedProductSubject.asObservable();
  }

  /** ✅ Instant access — no async race */
  getCurrentProduct(): Product | null {
    return this.selectedProduct;
  }
}
