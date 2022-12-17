import {ObjectId} from "mongodb";

export interface Category {
    _id?: ObjectId;
    name: string;
    attribute: Array<Object>;
    isVisible: boolean;
}
