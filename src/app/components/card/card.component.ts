import { Component, inject, input, output } from '@angular/core';
import { Product } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  product = input<Product>();
  addFavorite = output<Product>();
  removeFavorite = output<Product>();

  dialog = inject(MatDialog);

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
}
