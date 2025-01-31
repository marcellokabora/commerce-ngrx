import { Component, inject, input } from '@angular/core';
import { Product } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  products = input<Product[]>();
  dialog = inject(MatDialog);

  viewProduct(product: Product) {
    this.dialog.open(ProductComponent, {
      data: {
        product: product,
      },
    });
  }
}
