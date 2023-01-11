import {ObjectId} from "mongodb";

export interface Category {
    name: string;
    attribute: Array<Object>;
}