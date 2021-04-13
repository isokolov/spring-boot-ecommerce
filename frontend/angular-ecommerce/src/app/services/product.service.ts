import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../common/product";
import {map} from "rxjs/operators";
// ng generate service services/product
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient:HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    // http://localhost:8080/api/products/search/findByCategoryId?id=
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }

}
