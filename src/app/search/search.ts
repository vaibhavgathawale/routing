import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';     // for [(ngModel)]
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Data } from '../service/data';
import { Product } from '../models/Product.model';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
  
})
export class Search {
 searchControl = new FormControl('');
  results: Product[] = [];

  constructor(private data: Data) {
    this.searchControl.valueChanges
  .pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(value => {
      if (value && value.length >= 1) {
        return this.data.searchWords(value);
      } else {
          this.results = [];
        return [];
      }
    })
  )
  .subscribe({
    next: (data: Product[]) => this.results = data,
    error: (err) => console.error('Error fetching search results:', err)
  });

  }
  }


