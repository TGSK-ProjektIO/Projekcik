import {inject, injectable} from "inversify";
import {ReportRepository} from "../repository/report.repository";
import {TYPES} from "../config/types.config";
import {Report} from "../model/report";
import {ReportPartial} from "../model/report.partial";

@injectable()
export class ReportService {
  constructor(@inject(TYPES.ReportRepository) private reportRepository: ReportRepository) {
  }

  public sendReport(report: ReportPartial): Promise<Report> {
    return this.reportRepository.create(report);
  }

  public getReportsByCategory(category: number): Promise<Array<Report>> {
    return this.reportRepository.findByCategory(category);
  }

  public getAllReports(): Promise<Array<Report>> {
    return this.reportRepository.findAll();
  }

}
