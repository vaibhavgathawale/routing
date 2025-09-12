import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router  } from '@angular/router';
import { Data } from '../service/data';
import { Product } from '../models/Product.model';
import { Productservice } from '../service/productservice';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'] // ✅ fixed plural
})
export class ProductDetail implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute,
              private data: Data,
              private router: Router
            ) {}

  ngOnInit() {
    // ✅ Access navigation state properly
    const nav = this.router.getCurrentNavigation();
    const stateProduct = nav?.extras?.state?.['product'] as Product | undefined;

    if (stateProduct) {
      this.product = stateProduct;
      return;
    }

    // fallback to API
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id) && id > 0) {
        this.fetchProduct(id);
      }
    });
  }
  private fetchProduct(id: number) {
    this.data.getProductById(id).subscribe({
      next: (p) => (this.product = p),
      error: (err) => {
        console.error('Error fetching product:', err);
        this.product = undefined;
      }
    })

  }
}
