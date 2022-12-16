import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
   
@Injectable({
  providedIn: 'root'
})
export class ProduktService {
  private url = 'http://localhost:3000/api/v1/produkt/product/639ca9855ad5f7175f21f600';
    
  constructor(private httpClient: HttpClient) { }
   
  getProduct(){
    return this.httpClient.get(this.url);
  }
   
}