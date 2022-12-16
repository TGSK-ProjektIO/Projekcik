import {User} from "./User";
import {TypeOfReport} from "./TypeOfReport";
import {ConfirmationStatus} from "./ConfirmationStatus";
import {Product} from "../produkt/Product";

export class Report {
  id: number;
  type: TypeOfReport;
  description: string;
  status: ConfirmationStatus = ConfirmationStatus.WaitForDecision;
  product: Product;
  user: User;

  constructor(id: number, user: User, product: Product, type: TypeOfReport, description: string) {
    this.description = description;
    this.product = product;
    this.type = type;
    this.user = user;
    this.id = id;
  }

}
