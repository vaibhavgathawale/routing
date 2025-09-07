import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // for *ngIf, *ngFor
import { FormsModule } from '@angular/forms';     // for [(ngModel)]
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Data } from '../service/data';
import { Product } from '../models/Product.model';



@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
  
})
export class Search {
 searchControl = new FormControl('');
  results: string[] = [];

  constructor(private data: Data) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),               // wait for 300ms pause in typing
        distinctUntilChanged(),          // only call API if value changed
        switchMap(value => {
          if (value && value.length >= 2) {
            return this.data.searchWords(value);
          } else {
            this.results = [];
            return [];
          }
        })
      )
      .subscribe((data: string[]) => {
        this.results = data;
      });
  }
  }


