import {Product} from "../../../../express-backend-api/model/product";

export class ProductSearch {
  constructor(private _products: Product[]) {
    this._products = _products;
  }


  get products(): Product[] {
    return this._products;
  }

  getSearchResults(phrase: string): Product[] {
    return this._products.filter(product => product.name.toLocaleLowerCase().includes(phrase));
  }
}
