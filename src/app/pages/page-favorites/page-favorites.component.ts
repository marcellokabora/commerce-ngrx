import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-page-favorites',
  imports: [AsyncPipe, JsonPipe, MatProgressSpinnerModule],
  templateUrl: './page-favorites.component.html',
  styleUrl: './page-favorites.component.scss',
})
export class PageFavoritesComponent {
  products$!: Observable<Product[]>;
  favorites: string[] | undefined;
  productService = inject(ProductService);

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
}
