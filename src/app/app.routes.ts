import { Routes } from '@angular/router';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageFavoritesComponent } from './pages/page-favorites/page-favorites.component';
import { PageProductidComponent } from './pages/page-productid/page-productid.component';
import { PageShoppingComponent } from './pages/page-shopping/page-shopping.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: PageProductsComponent },
  { path: 'favorites', component: PageFavoritesComponent },
  { path: 'product/:id', component: PageProductidComponent },
  { path: 'shopping', component: PageShoppingComponent },
];
