import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://dummyjson.com';
  httpClient = inject(HttpClient);
  favorites: Product[] = this.getFavorites();

  getProducts(category?: string): Observable<Product[]> {
    let url = `${this.apiUrl}/products?limit=50`;
    if (category) {
      url = `${this.apiUrl}/products/category/${category}`;
    }
    return this.httpClient
      .get<Product[]>(url)
      .pipe(map((value: any) => value.products));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/products/categories`);
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


  getProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/product/${id}`);
  }



}

export interface Category {
  slug: string;
  name: number;
  url: string;
}

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  description?: string;
  images?: string[];
  favorite?: boolean;
  category?: string;
  discountPercentage?: number
  brand?: string
  warrantyInformation?: string
  shippingInformation?: string
  reviews?: Reviews[]
  returnPolicy?: string
  cart?: number
}

export interface Reviews {
  reviewerName: string;
  comment: string;
  date: string;
}

