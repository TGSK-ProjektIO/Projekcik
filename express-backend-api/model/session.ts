import {ObjectId} from "mongodb";

export interface Session {
  _id: ObjectId;
  startDate: Date;
  expireDate: Date;
  invalidated: boolean;
  userId: ObjectId;
}
