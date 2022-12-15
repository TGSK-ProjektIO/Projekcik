import {inject, injectable} from "inversify";
import {ProductRepository} from "../repository/product.repository";
import {TYPES} from "../config/types.config";
import {Product} from "../model/product";
import moment from "moment";

@injectable()
export class ProductService {
  constructor(@inject(TYPES.ProductRepository) private productRepository: ProductRepository) {

  }

  /* 
public raddProduct(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }
  */
}