import { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';



export interface MyData {
     id: number;
     name: string;
     // ... other properties
   }
export class Data {
     private apiUrl = 'http://localhost:8080/api/matches/search'; // Replace with your API URL

     constructor(private http: HttpClient) { }

     getData(): Observable<MyData[]> {
       return this.http.get<MyData[]>(this.apiUrl);
     }
}
