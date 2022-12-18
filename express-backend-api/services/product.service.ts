import {inject, injectable} from "inversify";
import {ProductRepository} from "../repository/product.repository";
import {TYPES} from "../config/types.config";
import {Product} from "../model/product";

@injectable()
export class ProductService {
  constructor(@inject(TYPES.ProductRepository) private productRepository: ProductRepository) {

  }

  public addProduct(product: Product): Promise<Product> {
      return this.productRepository.create(product);
    }

  public updateProduct(product: Product): Promise<void>  {
      return this.productRepository.update(product);
    }
  public getProduct(id: string): Promise<Product> {
      return this.productRepository.read(id);
    }

  public deleteProduct(id: string): Promise<void> {
      return this.productRepository.delete(id);
    }

  public getAllProducts(): Promise<Array<Product>> {
      return this.productRepository.readAll();
    }

  public deleteAllProducts(): Promise<void> {
    return this.productRepository.deleteAll();
  }

}
