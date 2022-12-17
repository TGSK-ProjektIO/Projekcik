import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {ReportService} from "../services/report.service";
import {Report} from "../model/report";
import {ReportPartial} from "../model/report.partial";


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
          _id: sentReport._id
        });
      } catch (error) {
        response.status(400).send({
          message: "Invalid params"
        });
      }
    }
  }

  public readReport() {
    return async (request: any, response: any) => {
      let id = request.params.id;
      if (!id) {
        return response.status(400).send({
          message: "Request is missing required 'id' parameter"
        });
      }

      try {
        const report = await this.reportService.readReportById(id);
        return response.status(200).send(
          report
        );
      } catch (error) {
        return response.status(404).send({
          message: "Report not found"
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

  public getAllReports() {
    return async (request: any, response: any) => {
      try {
        const reports = await this.reportService.getAllReports();
        return response.status(200).send(reports);
      } catch (error) {
        return response.status(404).send({
          message: "Reports not found"
        });
      }
    }
  }
}
