import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-products-page',
  imports: [AsyncPipe, MatProgressSpinnerModule, CardComponent],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss',
})
export class ProductsPage {
  products$!: Observable<Product[]>;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      if (category !== 'all') {
        this.products$ = this.getProduct(category);
      } else {
        this.products$ = this.getProduct();
      }
    });
  }

  getProduct(category?: string): Observable<Product[]> {
    return this.productService.getProducts(category).pipe(
      map((value: Product[]) => {
        value.map((product) => {
          if (this.productService.favorites) {
            product.favorite = this.productService.favorites
              .map((item) => item.id)
              .includes(product.id);
          }
          return product;
        });
        return value;
      })
    );
  }

  addFavorite(product: Product) {
    this.productService.addFavorites(product);
  }
  removeFavorite(product: Product) {
    this.productService.removeFavorites(product);
  }
}
