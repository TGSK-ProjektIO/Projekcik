import {inject, injectable} from "inversify";
import {ReportController} from "../controller/report.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class ReportRouter {
  constructor(@inject(TYPES.ReportController) private reportController: ReportController) {

  }
  addRoutes(app: Express): void {
    app.post('/api/v1/sugestie-i-zgloszenia/report', this.reportController.sendReport());
    app.get('/api/v1/sugestie-i-zgloszenia/report/:type', this.reportController.getReportsByCategory());
    app.get('/api/v1/sugestie-i-zgloszenia/getReports', this.reportController.getAllReports());
  }
}
