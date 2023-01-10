import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, pipe} from "rxjs";
import {Profile} from "../../../../express-backend-api/model/profile";
import {Opinion} from "../../../../express-backend-api/model/opinion";
import {Product} from "../../../../express-backend-api/model/product";

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

  getAllProfileOpinions(profile: Profile) {
    return this.httpClient.get(this.baseUrl + '/api/v1/opinie/getBuUser/' + profile._id);
  }

  getAllProducts() {
    return this.httpClient
      .get(this.baseUrl + '/api/v1/produkt/product');
  }

  getAllProductOpinions(product : Product) {
    return this.httpClient.get(this.baseUrl + '/api/v1/opinie/getByProduct/' + product._id)
  }

}
