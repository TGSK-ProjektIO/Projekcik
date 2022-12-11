import {User} from "./User";
import {Opinion} from "./Opinion";
import {ReportRepository} from "./ReportRepository";
import {Report} from "./Report";
import {TypeOfReport} from "./TypeOfReport";

export class ReportController {

  private reports: ReportRepository = new ReportRepository();
  sendReport(user: User, opinion: Opinion, category: TypeOfReport, description: string) {
    this.reports.createReport(user, opinion, category, description);
  }

  getReportsByCategory(category: TypeOfReport): Array<Report> {
    return this.reports.findBy(report => report.type == category);
  }

  getReports(predicate: (this:void, value: Report, index: number, obj: Report[]) => boolean): Array<Report> {
    return this.reports.findBy(predicate);
  }

}
