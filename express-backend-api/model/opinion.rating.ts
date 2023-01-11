import {ObjectId} from "mongodb";
export enum OpinionRatingState { None, Liked, Disliked}

export interface OpinionRating {
  _id?: ObjectId;
  userID: string;
  ratingState: OpinionRatingState;
}
