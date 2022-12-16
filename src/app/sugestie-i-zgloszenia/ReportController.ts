import {User} from "./User";
import {ReportRepository} from "./ReportRepository";
import {Report} from "./Report";
import {TypeOfReport} from "./TypeOfReport";
import {Product} from "../produkt/Product";

export class ReportController {

  private reports: ReportRepository = new ReportRepository();
  sendReport(user: User, product: Product, category: TypeOfReport, description: string) {
    this.reports.createReport(user, product, category, description);
  }

  getReportsByCategory(category: TypeOfReport): Array<Report> {
    return this.reports.findBy(report => report.type == category);
  }

  getReports(predicate: (this:void, value: Report, index: number, obj: Report[]) => boolean): Array<Report> {
    return this.reports.findBy(predicate);
  }

}
