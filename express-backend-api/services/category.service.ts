import {inject, injectable} from "inversify";
import {CategoryRepository} from "../repository/category.repository";
import {TYPES} from "../config/types.config";
import {Category} from "../model/category";
import moment from "moment";

export class CategoryService {
    constructor(@inject(TYPES.CategoryRepository) private categoryRepository: CategoryRepository) {

    }
  
}