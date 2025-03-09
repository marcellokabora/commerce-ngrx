import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category, ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

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
  category = new FormControl<string>('');
  categoryList$!: Observable<Category[]>;
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const category = params['category'];
      if (category !== 'all') {
        this.category.setValue(category);
      }
    });

    this.categoryList$ = this.productService.getCategories();
  }

  onChange() {
    this.router.navigate([], {
      queryParams: {
        category: this.category.value,
      },
    });
  }
}
