import {ObjectId} from "mongodb";

export interface Category {
    name: string;
    attributes: Array<Object>;
}