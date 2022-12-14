import {ObjectId} from "mongodb";

export interface Profile {
  _id?: ObjectId;
  nickname: string;
  profilePicture: string;
  description: string;
  isBanned: boolean;
}
