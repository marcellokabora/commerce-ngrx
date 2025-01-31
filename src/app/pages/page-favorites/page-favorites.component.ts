import { Component, inject } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-page-favorites',
  imports: [ProductsComponent, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './page-favorites.component.html',
  styleUrl: './page-favorites.component.scss',
})
export class PageFavoritesComponent {
  products$!: Observable<Product[]>;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      if (category !== 'all') {
        this.products$ = this.productService.getProducts(category);
      } else {
        this.products$ = this.productService.getProducts();
      }
    });
  }
}
