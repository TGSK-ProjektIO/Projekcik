import {inject, injectable} from "inversify";
import {CategoryRepository} from "../repository/category.repository";
import {TYPES} from "../config/types.config";
import {Category} from "../model/category";
import moment from "moment";

@injectable()
export class CategoryService {
    constructor(@inject(TYPES.CategoryRepository) private categoryRepository: CategoryRepository) {

    }

    public addCategory(category: Category): Promise<Category> {
        return this.categoryRepository.create(category);
        }

    public updateCategory(category: Category): Promise<void>  {
        console.log("service category modify");
        return this.categoryRepository.update(category);
        }

    public getCategory(id: string): Promise<Category> {
        return this.categoryRepository.read(id);
        }

    public deleteCategory(id: string): Promise<void> {
        return this.categoryRepository.delete(id);
        }

    public getAllCategories(): Promise<Array<Category>> {
        return this.categoryRepository.readAll();
    }

    public deleteAllCategories(): Promise<void> {
        return this.categoryRepository.deleteAll();
    }
}