import { Component, inject } from '@angular/core'
import { map, Observable, of } from 'rxjs'
import { Product, ProductService } from '../../services/product.service'
import { AsyncPipe } from '@angular/common'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ActivatedRoute, Params } from '@angular/router'
import { CardComponent } from '../../components/card/card.component'
import { Store } from '@ngrx/store'
import { cartList } from '../../store/cart.selectors'

@Component({
  selector: 'app-page-shopping',
  imports: [AsyncPipe, MatProgressSpinnerModule, CardComponent],
  templateUrl: './shopping.page.html',
  styleUrl: './shopping.page.scss',
})
export class ShoppingPage {
  products$: Observable<Product[]> = of([])
  productService = inject(ProductService)
  route = inject(ActivatedRoute)
  store = inject(Store)

  ngOnInit() {

    this.products$ = this.store.select(cartList)

    // this.route.queryParams.subscribe((params: Params) => {
    //   const category = params['category']
    //   if (category !== 'all') {
    //     this.products$ = this.getProduct(category)
    //   } else {
    //     this.products$ = this.getProduct()
    //   }
    // })
  }

  // getProduct(category?: string): Observable<Product[]> {
  //   return this.productService.getProducts(category).pipe(
  //     map((value: Product[]) => {
  //       value.map((product) => {
  //         if (this.productService.favorites) {
  //           product.favorite = this.productService.favorites
  //             .map((item) => item.id)
  //             .includes(product.id)
  //         }
  //         return product
  //       })
  //       return value
  //     })
  //   )
  // }

  addFavorite(product: Product) {
    this.productService.addFavorites(product)
  }
  removeFavorite(product: Product) {
    this.productService.removeFavorites(product)
  }
}
