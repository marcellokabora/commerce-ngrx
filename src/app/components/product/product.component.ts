import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  data = inject(MAT_DIALOG_DATA);
  index: number = 0;
  product: Product = this.data.product;

  onScroll(target: HTMLElement, index: number) {
    this.index = index;
    const scrollLeft = 500 * index;
    target.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
}
