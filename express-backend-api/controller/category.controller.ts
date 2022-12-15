import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {CategoryService} from "../services/category.service";

export class CategoryController {
    constructor(@inject(TYPES.CategoryService) private categoryService: CategoryService) {
    }

}