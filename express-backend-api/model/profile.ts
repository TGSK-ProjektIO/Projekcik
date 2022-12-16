import {ObjectId} from "mongodb";

export interface Profile {
  _id?: ObjectId;
  userId: string;
  nickname: string;
  profilePicture: string;
  description: string | null;
  isBanned: boolean;
}
