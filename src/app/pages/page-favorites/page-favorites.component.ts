import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-page-favorites',
  imports: [MatProgressSpinnerModule, CardComponent, MatProgressSpinnerModule],
  templateUrl: './page-favorites.component.html',
  styleUrl: './page-favorites.component.scss',
})
export class PageFavoritesComponent {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  favorites: Product[] = [];
  reset: Product[] = [];

  ngOnInit() {
    this.favorites = this.productService.getFavorites();
    if (this.favorites) {
      this.favorites.map((value) => {
        value.favorite = true;
        return value;
      });
      this.reset = this.favorites;
    }

    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      if (category !== 'all' && category) {
        this.favorites = this.reset;
        this.favorites = this.reset.filter(
          (value) => value.category === category
        );
      } else {
        this.favorites = this.reset;
      }

      this.favorites.map((value) => {
        value.favorite = true;
        return value;
      });
    });
  }

  onFavorite(product: Product) {
    this.favorites = this.favorites.filter((value) => value.id !== product.id);
  }
}
