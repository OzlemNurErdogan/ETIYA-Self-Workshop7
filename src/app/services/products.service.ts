import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { environment } from 'src/environments/environment';

import { GetListOptionsType } from '../models/get-list-options';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  controllerUrl: string = `${environment.apiUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  getProducts(options?: GetListOptionsType): Observable<Product[]> {
    let queryParams: any = {};
    if (options?.pagination) {
      queryParams['_page'] = options.pagination.page;
      queryParams['_limit'] = options.pagination.pageSize;
    }
    if (options?.filters) {
      queryParams = { ...queryParams, ...options.filters };
    }

    return this.httpClient.get<Product[]>(this.controllerUrl, {
      params: queryParams,
    });
  }

  getById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.controllerUrl}/${productId}`);
  }
  add(request: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.controllerUrl, request);
  }

  update(request: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.controllerUrl}/${request.id}`,
      request
    );
  }

  delete(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(
      `${this.controllerUrl}/${productId}`
    );
  }
}
