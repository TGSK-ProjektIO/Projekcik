import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'express-backend-api/model/product';
import { Category } from 'express-backend-api/model/category';
@Injectable({
  providedIn: 'root'
})
export class ProduktService {
  private url = 'http://localhost:3000/api/v1/produkt/product/';
  private urlAll = 'http://localhost:3000/api/v1/produkt/product';

  private urlCategory = 'http://localhost:3000/api/v1/produkt/category/';
  private urlAllCategories = 'http://localhost:3000/api/v1/produkt/category';

  constructor(private httpClient: HttpClient) { }
   
  getProduct(last: string){
    return this.httpClient.get(this.url + last);
  }

  getProducts(){
    return this.httpClient.get(this.urlAll);
  }

  modifyProduct(last: string, product: Product) {
    return this.httpClient.put<Product>(this.url + last, product);
  }

  deleteProduct(last: string){
    return this.httpClient.delete(this.url + last);
  }


  getCategory(last: string){
    return this.httpClient.get(this.urlCategory + last);
  }

  getCategories(){
    return this.httpClient.get(this.urlAllCategories);
  }

  modifyCategory(last: string, category: Category) {
    return this.httpClient.put<Product>(this.urlCategory + last, category);
  }

  deleteCategory(last: string){
    return this.httpClient.delete(this.urlCategory + last);
  }

   
}