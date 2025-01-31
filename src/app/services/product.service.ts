import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://dummyjson.com/products';
  httpClient = inject(HttpClient);
  favorites: Product[] = this.getFavorites();

  getProducts(category?: string): Observable<Product[]> {
    let url = `${this.apiUrl}/?limit=50`;
    if (category) {
      url = `${this.apiUrl}/category/${category}`;
    }
    return this.httpClient
      .get<Product[]>(url)
      .pipe(map((value: any) => value.products));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getFavorites(): Product[] {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites) as Product[];
      return this.favorites;
    }
    return [];
  }

  addFavorites(product: Product) {
    this.favorites = [...this.favorites, product];
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
  removeFavorites(product: Product) {
    this.favorites = this.favorites.filter((value) => value.id !== product.id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}

export interface Category {
  slug: string;
  name: number;
  url: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  favorite: boolean;
  stock: number;
  images: string[];
  category: string;
}
