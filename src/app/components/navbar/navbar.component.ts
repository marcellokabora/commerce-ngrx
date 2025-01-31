import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Category, ProductService } from '../../services/product.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  toppings = new FormControl<string>('');
  toppingList$!: Observable<Category[]>;
  productService = inject(ProductService);

  ngOnInit() {
    this.toppingList$ = this.productService.getCategories();
    this.toppings.valueChanges.subscribe((value) => {
      if (value) this.productService.category.set(value);
    });
  }
}
