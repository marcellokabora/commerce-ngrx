import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://dummyjson.com/products';
  httpClient = inject(HttpClient);
  category = signal<string>('all');

  getProducts(): Observable<Product[]> {
    let url = `${this.apiUrl}/?limit=50`;
    if (this.category() !== 'all') {
      url = `${this.apiUrl}/category/${this.category()}`;
    }
    console.log(url);

    return this.httpClient
      .get<Product[]>(url)
      .pipe(map((value: any) => value.products));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`);
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
}
