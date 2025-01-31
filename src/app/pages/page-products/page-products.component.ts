import { Component, effect, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page-products',
  imports: [JsonPipe, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './page-products.component.html',
  styleUrl: './page-products.component.scss',
})
export class PageProductsComponent {
  products$!: Observable<Product[]>;
  favorites: string[] | undefined;
  productService = inject(ProductService);

  constructor() {
    effect(() => {
      if (this.productService.category())
        this.products$ = this.productService.getProducts();
    });
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    this.productService.getFavorites();
    this.favorites = this.productService.favorites;
  }
}
