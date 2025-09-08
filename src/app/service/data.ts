import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import { Product } from '../models/Product.model';
   

@Injectable({
  providedIn: 'root'   // ✅ this makes it globally available
})

export class Data {


  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Search by word prefix
  searchWords(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?q=${query}`);
  }

  // Fetch single product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Fetch all products (optional)
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

}
