import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, pipe} from "rxjs";
import {Profile} from "../../../../express-backend-api/model/profile";

@Injectable({
  providedIn: 'root'
})
export class WyszukiwanieService {
  private baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getAllProfiles() {
    return this.httpClient
      .get(this.baseUrl + '/api/v1/panel-uzytkownika/profile/getAllProfiles')
  }

  getAllProducts() {
    return this.httpClient
      .get(this.baseUrl + '/api/v1/produkt/product');
  }

}
