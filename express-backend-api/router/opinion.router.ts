import {inject, injectable} from "inversify";
import {OpinionController} from "../controller/opinion.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class OpinionRouter {
  constructor(@inject(TYPES.OpinionController) private opinionController: OpinionController) {
  }

  addRoutes(app: Express): void {
    let basePath = "/api/v1/opinie"
    app.post(`${basePath}/add`, this.opinionController.addOpinion());
    app.delete(`${basePath}/remove`, this.opinionController.removeOpinion());
    app.put(`${basePath}/modify`, this.opinionController.modifyOpinion());
    app.put(`${basePath}/like/:id`, this.opinionController.addLike());
    app.put(`${basePath}/dislike/:id`, this.opinionController.addDislike());
    app.get(`${basePath}/get/:id`, this.opinionController.getOpinion());
    app.get(`${basePath}/getByUser/:id`, this.opinionController.getOpinionsByUser());
    app.get(`${basePath}/getByProduct/:id`, this.opinionController.getOpinionsByProduct());
  }
}
