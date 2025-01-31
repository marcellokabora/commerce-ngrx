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
  favorite = output<boolean>();

  dialog = inject(MatDialog);

  viewProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: {
        product: product,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      product.favorite = result;
      this.favorite.emit(false);
    });
  }
}
