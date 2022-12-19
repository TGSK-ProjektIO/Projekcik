import {ObjectId} from "mongodb";
import {Attribute} from "./attribute";

export interface Product {
    _id?: ObjectId;
    name: string;
    description: string;
    tag: Array<string>;
    categoryName: string;
    attribute: Array<Attribute>;
    image: string;
    isVisible: boolean;
}
