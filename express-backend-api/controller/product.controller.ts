import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product";

@injectable()
export class ProductController {
  constructor(@inject(TYPES.ProductService) private productService: ProductService) {
  }




public getProduct() {
  return async (request: any, response: any) => {
    const productId = request.params.id;
    if (!productId) {
      return response.status(400).send({
        message: "Request is missing required 'id' parameter"
      });
    }

    try {
      const product = await this.productService.getProduct(productId);
      return response.status(200).send(product);
    } catch (error) {
      return response.status(404).send({
        message: "Product not found"
      });
    }
  }
}

public updateProduct() {
  return async (request: any, response: any) => {
    const productId = request.params.id;
    //idk co dalej
    if (!productId) {
      return response.status(400).send({
        message: "Request is missing required 'id' parameter"
      });
    }
    try {
      const product = await this.productService.updateProduct(productId);
      //idk
      return response.status(200).send({
        message: "Product updated successfully"
      });
    } catch (error) {
      return response.status(404).send({
        message: "Product not found"
      });
    }
  }
}


public addProduct() {
  return async (request: any, response: any) => {
      let product = request.body;
      try {
        const newProduct = await this.productService.addProduct(product);
        response.status(201).send({
          message: "Added new product",
          id: newProduct._id
        });
      } 
      catch (error) {
        response.status(400).send({
          message: "Invalid params"
        });
      }
    }
}

public deleteProduct() {
  return async (request: any, response: any) => {
    const productId = request.params.id;
    try {
      await this.productService.deleteProduct(productId);
      response.status(201).send({
        message: "Deleted product",
        id: productId
      });
    } catch (error) {
      response.status(400).send({
        message: "Product not found"
      });
    }
  }
}

//idk
public getAllProducts() {
  return async (request: any, response: any) => {
    let productId : string = request.params.id;
    try {
      let products : Array<Product> = await this.productService.getAllProducts();
      response.status(200).send(products);
    } catch (error) {
      response.status(400).send({
        message: "Cannot retrieve products from database"
      });
    }
  }
}

}
