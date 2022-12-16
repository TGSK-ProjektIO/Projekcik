import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {ReportService} from "../services/report.service";


@injectable()
export class ReportController {
  constructor(@inject(TYPES.ReportService) private reportService: ReportService) {
  }

  public sendReport() {
    return async (request: any, response: any) => {
      let report = request.body;
      try {
        const sentReport = await this.reportService.sendReport(report);
        response.status(201).send({
          message: "created",
          id: sentReport._id
        });
      } catch (error) {
        response.status(400).send({
          message: "Invalid params"
        });
      }
    }
  }

  public getReportsByCategory() {
    return async (request: any, response: any) => {
      let category = request.params.type;
      if (!category) {
        return response.status(400).send({
          message: "Request is missing required 'category' parameter"
        });
      }

      try {
        const reports = await this.reportService.getReportsByCategory(category);
        return response.status(200).send(reports);
      } catch (error) {
        return response.status(404).send({
          message: "Reports not found"
        });
      }
    }
  }

  public getReports() {
    return async (request: any, response: any) => {

      try {
        const reports = await this.reportService.getReports();
        return response.status(200).send(reports);
      } catch (error) {
        return response.status(404).send({
          message: "Reports not found"
        });
      }
    }
  }
}
