import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Productservice {
  private apiUrl = 'http://localhost:8080/api';
  private cartItems: Product[] = [];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private selectedProductSubject = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProductSubject.asObservable();

  // Load all products
  loadProducts(): void {
    this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
      next: (data) => this.productsSubject.next(data),
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  // Get products for shopping
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  // Search products
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/search?q=${encodeURIComponent(query)}`);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Set selected product for navigation
  setSelectedProduct(product: Product): void {
    this.selectedProductSubject.next(product);
    // Also store in localStorage for persistence across navigation (only in browser)
    if (this.isBrowser()) {
      localStorage.setItem('selectedProduct', JSON.stringify(product));
    }
  }

  // Get selected product (observable)
  getSelectedProduct(): Observable<Product | null> {
    return this.selectedProductSubject.asObservable();
  }

  // Get current product synchronously
  getCurrentProduct(): Product | null {
    if (this.isBrowser()) {
      const stored = localStorage.getItem('selectedProduct');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  // Add to cart
  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(item => item.id === product.id && item.selectedSize === product.selectedSize);
    
    if (existingProduct) {
      existingProduct.quantity += product.quantity || 1;
    } else {
      const cartProduct = { ...product, quantity: product.quantity || 1 };
      this.cartItems.push(cartProduct);
    }
    
    this.updateCartState();
  }

  // Update cart quantity
  updateCartItemQuantity(productId: number, size: string, quantity: number): void {
    const product = this.cartItems.find(item => item.id === productId && item.selectedSize === size);
    if (product) {
      product.quantity = quantity;
      if (product.quantity <= 0) {
        this.removeFromCart(productId, size);
      } else {
        this.updateCartState();
      }
    }
  }

  // Remove from cart
  removeFromCart(productId: number, size: string): void {
    this.cartItems = this.cartItems.filter(item => !(item.id === productId && item.selectedSize === size));
    this.updateCartState();
  }

  // Get cart items
  getCartItems(): Product[] {
    return this.cartItems;
  }

  // Clear cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  // Update cart state
  private updateCartState(): void {
    this.cartItemsSubject.next([...this.cartItems]);
    const totalCount = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalCount);
    
    // Save to localStorage for persistence (only in browser)
    if (this.isBrowser()) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  // Load cart from localStorage
  loadCartFromStorage(): void {
    if (this.isBrowser()) {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartState();
      }
    }
  }

  // Helper method to check if running in browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}