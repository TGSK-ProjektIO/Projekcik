import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'express-backend-api/model/product';
   
@Injectable({
  providedIn: 'root'
})
export class ProduktService {
  private url = 'http://localhost:3000/api/v1/produkt/product/';
    
  private urlAll = 'http://localhost:3000/api/v1/produkt/product'
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
   
}