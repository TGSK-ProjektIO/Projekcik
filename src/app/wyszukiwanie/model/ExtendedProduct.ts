import {Product} from "../../../../express-backend-api/model/product";

export interface ExtendedProduct extends Product {
  numberOfOpinions : number
}
