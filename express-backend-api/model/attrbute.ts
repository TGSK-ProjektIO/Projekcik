import {ObjectId} from "mongodb";


export interface Attribute {
    _id?: ObjectId;
    categoryId: string;
    name: string;
    value: string;
}