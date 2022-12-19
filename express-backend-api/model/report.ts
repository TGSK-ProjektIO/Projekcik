import {ObjectId} from "mongodb";

export interface Report {
  _id: ObjectId;
  type: number;
  description: string;
  status: number;
  idProduct: string;
  idUser: string;
}
