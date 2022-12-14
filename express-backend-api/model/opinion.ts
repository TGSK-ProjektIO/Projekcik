import {ObjectId} from "mongodb";
import {OpinionRating} from "./opinion.rating";
import {Rating} from "./rating";
import {Review} from "./review";

export interface Opinion {
  _id?: ObjectId;
  userId: string;
  productId: string;
  opinionRatings: Array<OpinionRating>;
  review: Review;
  ratings: Array<Rating>;
}
