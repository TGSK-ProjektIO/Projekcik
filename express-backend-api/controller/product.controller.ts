import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {ProductService} from "../services/product.service";

@injectable()
export class ProductController {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {
  }

  /*
  public addProduct() {
    return async (request: any, response: any) => {
        let product = request.body;
        try {
          const createdOpinion = await this.productService.addProduct(product);
          response.status(201).send({
            message: "created",
            id: createdOpinion._id
          });
        } 
        catch (error) {
          response.status(400).send({
            message: "Invalid params"
          });
        }
      }
  }
*/


}
