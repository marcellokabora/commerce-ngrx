import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-favorites-page',
  imports: [MatProgressSpinnerModule, CardComponent],
  templateUrl: './favorites.page.html',
  styleUrl: './favorites.page.scss',
})
export class FavoritesPage {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  products: Product[] = [];
  category: string = '';

  ngOnInit() {
    window.scroll({
      top: 0,
    });
    this.route.queryParams.subscribe((params: Params) => {
      this.category = params['category'];
      this.getFavoriteCategory();
    });
  }

  getFavoriteCategory() {
    if (this.category && this.category !== 'all') {
      this.products = this.getFavorites(this.category);
    } else {
      this.products = this.getFavorites();
    }
  }

  removeFavorite(product: Product) {
    this.productService.removeFavorites(product);
    this.getFavoriteCategory();
  }

  getFavorites(category?: string) {
    return this.productService.favorites
      .map((value) => {
        value.favorite = true;
        return value;
      })
      .filter((value) => (category ? value.category === category : value));
  }
}
