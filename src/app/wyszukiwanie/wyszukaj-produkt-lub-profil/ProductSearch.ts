import {Product} from "../../../../express-backend-api/model/product";
import {ExtendedProduct} from "../model/ExtendedProduct";

export class ProductSearch {
  constructor(private _products: ExtendedProduct[]) {
    this._products = _products;
  }


  get products(): ExtendedProduct[] {
    return this._products;
  }

  getSearchResults(phrase: string): ExtendedProduct[] {
    return this._products.filter(product => product.name.toLocaleLowerCase().includes(phrase));
  }
}
