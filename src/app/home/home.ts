import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Productservice } from '../service/productservice';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

    constructor(private router: Router,private productService: Productservice) {}

    ngOnInit(): void {
    // load products only once
    this.productService.loadProducts();
  }


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
