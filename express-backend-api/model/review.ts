import {ObjectId} from "mongodb";

export interface Review {
  _id?: ObjectId;
  userID: string;
  text: string;
}
