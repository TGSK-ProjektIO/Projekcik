import {inject, injectable} from "inversify";
import {ProductController} from "../controller/product.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class ProductRouter {
  constructor(@inject(TYPES.ProductController) private productController: ProductController) {

  }

  addRoutes(app: Express): void {
    app.get('/api/v1/produkt/product/:id', this.productController.getProduct());
    app.put('/api/v1/produkt/product/:id', this.productController.updateProduct());
    app.post('/api/v1/produkt/product', this.productController.addProduct());
    app.delete('/api/v1/produkt/product/:id', this.productController.deleteProduct());
    app.get('/api/v1/produkt/product', this.productController.getAllProducts());
  }
}

