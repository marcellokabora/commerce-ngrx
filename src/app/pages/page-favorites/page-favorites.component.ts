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
  category: string = '';

  ngOnInit() {
    this.favorites = this.productService.getFavorites();
    if (this.favorites) {
      this.favorites.map((value) => {
        value.favorite = true;
        return value;
      });
      this.reset = [...this.favorites];
    }

    this.route.queryParams.subscribe((params: Params) => {
      this.category = params['category'];
      if (this.category && this.category !== 'all') {
        this.favorites = [
          ...this.reset.filter((value) => value.category === this.category),
        ];
      } else {
        this.favorites = this.reset;
      }
    });
  }

  removeFavorite(product: Product) {
    this.reset = [...this.reset.filter((value) => value.id !== product.id)];
    if (this.category && this.category !== 'all') {
      this.favorites = [
        ...this.reset.filter(
          (value) => value.category === this.category && value.id !== product.id
        ),
      ];
    } else {
      this.favorites = this.reset;
    }
  }
}
