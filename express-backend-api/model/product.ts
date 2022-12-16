import {ObjectId} from "mongodb";
import {Category} from "../model/category";
import {Attribute} from "./attrbite";

export interface Product {
    _id?: ObjectId;
    name: string;
    description: string;
    tag: Array<string>;
    categoryId: string;
    attribute: Array<Attribute>;
}
