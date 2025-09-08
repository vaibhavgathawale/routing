import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../service/data';
import { Product } from '../models/Product.model';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail  implements OnInit {
  product?: Product;

  constructor(private route: ActivatedRoute, private data: Data) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.data.getProductById(id).subscribe(p => this.product = p);
      }
    });
  }
}
