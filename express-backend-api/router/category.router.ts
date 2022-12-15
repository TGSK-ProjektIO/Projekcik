import {inject, injectable} from "inversify";
import {CategoryController} from "../controller/category.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class CategoryRouter {
  constructor(@inject(TYPES.CategoryController) private categoryController: CategoryController) {

  }

  addRoutes(app: Express): void {
    app.get('/api/v1/produkt/category/:id', this.categoryController.getCategory());
    app.put('/api/v1/produkt/category/:id', this.categoryController.updateCategory());
    app.post('/api/v1/produkt/category', this.categoryController.addCategory());
    app.delete('/api/v1/produkt/category/:id', this.categoryController.deleteCategory());
    app.get('/api/v1/produkt/category', this.categoryController.getAllCategories());
  }
}
