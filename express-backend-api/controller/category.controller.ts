import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {CategoryService} from "../services/category.service";
import {Category} from "../model/category";

export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) {
    }

    public getCategory() {
        return async (request: any, response: any) => {
          const categoryId = request.params.id;
          if (!categoryId) {
            return response.status(400).send({
              message: "Request is missing required 'id' parameter"
            });
          }
      
          try {
            const category = await this.categoryService.getCategory(categoryId);
            return response.status(200).send(category);
          } catch (error) {
            return response.status(404).send({
              message: "Category not found"
            });
          }
        }
      }
      
      public updateCategory() {
        return async (request: any, response: any) => {
            let category = request.body;
            try {
              await this.categoryService.updateCategory(category);
              response.status(201).send({
                message: "updated",
                id: category.id
              });
            } catch (error) {
              response.status(400).send({
                message: "Category not found"
              });
            }
          }
      }
      
      
      public addCategory() {
        return async (request: any, response: any) => {
            let category = request.body;
            try {
              const newCategory = await this.categoryService.addCategory(category);
              response.status(201).send({
                message: "Added new category",
                id: newCategory._id
              });
            } 
            catch (error) {
              response.status(400).send({
                message: "Invalid params"
              });
            }
          }
      }
      
      public deleteCategory() {
        return async (request: any, response: any) => {
          const categoryId = request.params.id;
          try {
            await this.categoryService.deleteCategory(categoryId);
            response.status(201).send({
              message: "Deleted category",
              id: categoryId
            });
          } catch (error) {
            response.status(400).send({
              message: "Category not found"
            });
          }
        }
      }
      
      //idk
      public getAllCategories() {
        return async (request: any, response: any) => {
          let categoryId : string = request.params.id;
          try {
            let categories : Array<Category> = await this.categoryService.getAllCategories();
            response.status(200).send(categories);
          } catch (error) {
            response.status(400).send({
              message: "Cannot retrieve categories from database"
            });
          }
        }
      }

}