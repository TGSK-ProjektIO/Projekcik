import {inject, injectable} from "inversify";
import {CategoryRepository} from "../repository/category.repository";
import {TYPES} from "../config/types.config";
import {Category} from "../model/category";
import moment from "moment";

export class CategoryService {
    constructor(@inject(TYPES.CategoryRepository) private categoryRepository: CategoryRepository) {

    }

    public addCategory(category: Category): Promise<Category> {
        return this.categoryRepository.create(category);
      }

    public updateCategory(category: Category): Promise<void>  {
        return this.categoryRepository.update(category);
      }

    public getCategory(id: string): Promise<Category> {
        return this.categoryRepository.read(id);
      }
  
    public deleteCategory(id: string): Promise<void> {
        return this.categoryRepository.delete(id);
      }

    //for sure is wrong
    public getAllCategories(): Promise<Array<Category>> {
        return new Promise<Array<Category>>(async (resolve, reject) => {
          try {
            const categories = await this.categoryRepository.getAllCategories();
          } catch (error) {
            reject();
          }
        });
      }
}