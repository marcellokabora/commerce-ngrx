import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-page',
  imports: [MatIconModule, AsyncPipe, MatButtonModule, NgOptimizedImage, DatePipe],
  templateUrl: './product.page.html',
  styleUrl: './product.page.scss'
})
export class ProductPage {

  route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')

  productService = inject(ProductService)

  product$!: Observable<Product>

  ngOnInit() {
    console.log(this.id);
    if (this.id)
      this.product$ = this.productService.getProduct(this.id)
  }





  addCart(item: Product) { }
  onFavorite(item: Product) { }

}
