import { Component, inject } from '@angular/core'
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router'
import { MatSelectModule } from '@angular/material/select'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { Category, Product, ProductService } from '../../services/product.service'
import { AsyncPipe } from '@angular/common'
import { Observable, of } from 'rxjs'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatBadgeModule } from '@angular/material/badge'
import { Store } from '@ngrx/store'
import { AppState } from '../../store/app.state'
import { cartCount } from '../../store/cart.selectors'

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIcon,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  category = new FormControl<string>('')
  categoryList$: Observable<Category[]> = of([])
  productService = inject(ProductService)
  router = inject(Router)
  route = inject(ActivatedRoute)
  store = inject(Store<AppState>)
  count$: Observable<number> = of(0)

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category']
      if (category !== 'all') {
        this.category.setValue(category)
      }
    })
    this.categoryList$ = this.productService.getCategories()
    this.count$ = this.store.select(cartCount)
  }

  onChange() {
    this.router.navigate([], {
      queryParams: {
        category: this.category.value,
      },
    })
  }
}
