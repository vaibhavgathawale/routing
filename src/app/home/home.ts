import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

    constructor(private router: Router) {}



  goToSearch() {
    this.router.navigate(['/search']);
  }

  Carousel(){
    this.router.navigate(['/Carousel']);

  }
  CartHome(){
        this.router.navigate(['/carthome']);

  }
    
}
