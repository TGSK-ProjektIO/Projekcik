import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
   
@Injectable({
  providedIn: 'root'
})
export class ProduktService {
  private url = 'http://localhost:3000/api/v1/produkt/product/';
    
  constructor(private httpClient: HttpClient) { }
   
  getProduct(last: string){
    return this.httpClient.get(this.url + last);
  }

  modifyProduct(last: string, name: string, description: string, categoryName: string, tag: string, image: string) {
    return this.httpClient.put(this.url + last,{
        "name": name,
        "description": description,
        "categoryName": categoryName,
        "tag": tag,
        "image": image

    });
  }
   
}