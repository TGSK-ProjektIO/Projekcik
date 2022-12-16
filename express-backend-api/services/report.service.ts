import {inject, injectable} from "inversify";
import {ReportRepository} from "../repository/report.repository";
import {TYPES} from "../config/types.config";
import {TypeOfReport} from "../../src/app/sugestie-i-zgloszenia/TypeOfReport";
import {Report} from "../model/report";

@injectable()
export class ReportService {
  constructor(@inject(TYPES.ReportRepository) private reportRepository: ReportRepository) {

  }

  public sendReport(report: Report): Promise<Report> {
    return this.reportRepository.createReport(report);
  }

  public getReportsByCategory(category: TypeOfReport): Promise<Array<Report>> {
    return this.reportRepository.findByCategory(category);
  }

  public getReports(): Promise<Array<Report>> {
    return this.reportRepository.findAll();
  }
}
