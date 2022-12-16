import {ObjectId} from "mongodb";

export interface OpinionRating {
  _id?: ObjectId;
  userID: string;
  like: number;
  dislike: number;
}
