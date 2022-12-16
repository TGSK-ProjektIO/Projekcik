import {inject, injectable} from "inversify";
import {ProductRepository} from "../repository/product.repository";
import {TYPES} from "../config/types.config";
import {Product} from "../model/product";
import moment from "moment";

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

    //for sure is wrong
  public getAllProducts(): Promise<Array<Product>> {
      return new Promise<Array<Product>>(async (resolve, reject) => {
        try {
          const products = await this.productRepository.getAllProducts();
        } catch (error) {
          reject();
        }
      });
    }
  
}