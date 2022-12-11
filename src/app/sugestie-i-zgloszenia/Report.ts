import {Opinion} from "./Opinion";
import {User} from "./User";
import {TypeOfReport} from "./TypeOfReport";
import {ConfirmationStatus} from "./ConfirmationStatus";

export class Report {
  id: number;
  type: TypeOfReport;
  description: string;
  status: ConfirmationStatus = ConfirmationStatus.WaitForDecision;
  opinion: Opinion;
  user: User;

  constructor(id: number, user: User, opinion: Opinion, type: TypeOfReport, description: string) {
    this.description = description;
    this.opinion = opinion;
    this.type = type;
    this.user = user;
    this.id = id;
  }

}
