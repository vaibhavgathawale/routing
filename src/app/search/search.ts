import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';     // for [(ngModel)]
import { HttpClientModule, HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
  
})
export class Search {
   query: string = '';
  matches: any[] = [];


  searchMatch() {
    
    }
  }


