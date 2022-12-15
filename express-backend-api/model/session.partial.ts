import {ObjectId} from "mongodb";

export interface SessionPartial {
  startDate: Date;
  userId: ObjectId;
}
