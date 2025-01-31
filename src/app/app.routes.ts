import { Routes } from '@angular/router';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageFavoritesComponent } from './pages/page-favorites/page-favorites.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: PageProductsComponent },
  { path: 'favorites', component: PageFavoritesComponent },
];
