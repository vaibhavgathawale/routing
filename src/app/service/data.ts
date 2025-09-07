import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   

@Injectable({
  providedIn: 'root'   // ✅ this makes it globally available
})

export class Data {
   

    private apiUrl = 'http://localhost:8080/api/words/search';

  constructor(private http: HttpClient) {}

  searchWords(query: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?q=${query}`);
  }

}
