import {ObjectId} from "mongodb";
import {User} from "./user";
import {TypeOfReport} from "../../src/app/sugestie-i-zgloszenia/TypeOfReport";
import {ConfirmationStatus} from "../../src/app/sugestie-i-zgloszenia/ConfirmationStatus";
import {Product} from "../../src/app/produkt/Product";

export interface Report {
  _id?: ObjectId;
  type: TypeOfReport;
  description: string;
  status: ConfirmationStatus;
  product: Product;
  user: User;
}
