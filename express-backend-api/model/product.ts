import {ObjectId} from "mongodb";
import {Category} from "../model/category";


export interface Product {
    _id?: ObjectId;
    name: string;
    description: string;
    tag: Array<string>;
    category: Category;
    attribute: Array<string>;
}
