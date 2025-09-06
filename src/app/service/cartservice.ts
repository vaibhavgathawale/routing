import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cartservice {

    constructor(private http: HttpClient) {}

    private api = 'http://localhost:8080/api/cart';

  getProducts(): Observable<any> {
    return this.http.get(this.api + '/products');
  }

  getCart(): Observable<any> {
    return this.http.get(this.api);
  }

  addToCart(productId: number): Observable<any> {
    return this.http.post(this.api + '/add/' + productId, {});
  }
}
