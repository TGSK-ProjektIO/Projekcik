import {ObjectId} from "mongodb";

export interface Rating {
  _id?: ObjectId;
  userID: string;
  name: string;
  rating: number;
}
