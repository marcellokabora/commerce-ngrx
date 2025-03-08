import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-page-productid',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './page-productid.component.html',
  styleUrl: './page-productid.component.scss'
})
export class PageProductidComponent {

  route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')



  productService = inject(ProductService)

  product$!: Observable<Product>

  ngOnInit() {
    console.log(this.id);
    if (this.id)
      this.product$ = this.productService.getProduct(this.id)
  }





  addCart(item: Product) { }
  onFavorite(item: Product) { }

}
