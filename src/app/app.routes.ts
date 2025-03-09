import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { ProductPage } from './pages/product/product.page';
import { ShoppingPage } from './pages/shopping/shopping.page';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsPage },
  { path: 'favorites', component: FavoritesPage },
  { path: 'product/:id', component: ProductPage },
  { path: 'shopping', component: ShoppingPage },
];
