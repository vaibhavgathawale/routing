import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';





@Injectable({
  providedIn: 'root'
  
})
export class Productservice {

    constructor(private http: HttpClient) {}

  
    private apiUrl = 'http://localhost:8080/api/products'; // replace with your backend URL


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
