import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatDialogModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input<Product>();
  addFavorite = output<Product>();
  removeFavorite = output<Product>();
  dialog = inject(MatDialog);
  router = inject(Router)
  store = inject(Store)

  viewProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: {
        product: product,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'add') {
        product.favorite = true;
        this.addFavorite.emit(product);
      }
      if (result === 'remove') {
        product.favorite = false;
        this.removeFavorite.emit(product);
      }
    });
  }

  onFavorite(product: Product) {
    if (product.favorite) {
      this.removeFavorite.emit(product);
    } else {
      this.addFavorite.emit(product);
    }
    product.favorite = !product.favorite;
  }

  onAddToCart(product: Product) {
    this.store.dispatch(addToCart(product))
    product.cart = product.cart ? product.cart + 1 : 1
  }

  onCount(product: Product, value: number) {
    product.cart = product.cart ? product.cart + value : 1
  }
}
