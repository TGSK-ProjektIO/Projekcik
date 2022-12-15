import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {OpinionService} from "../services/opinion.service";
import {SessionService} from "../services/session.service";

@injectable()
export class OpinionController {
  constructor(@inject(TYPES.OpinionService) private opinionService: OpinionService,
              @inject(TYPES.SessionService) private sessionService: SessionService) {
  }

  public addOpinion() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      try {
        const createdOpinion = await this.opinionService.addOpinion(opinion);
        response.status(201).send({
          message: "created",
          id: createdOpinion._id
        });
      } catch (error) {
        response.status(400).send({
          message: "Invalid params"
        });
      }
    }
  }

  public removeOpinion() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      try {
        await this.opinionService.removeOpinion(opinion.id);
        response.status(201).send({
          message: "deleted",
          id: opinion.id
        });
      } catch (error) {
        response.status(400).send({
          message: "Opinion not found"
        });
      }
    }
  }

  public modifyOpinion() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      try {
        await this.opinionService.updateOpinion(opinion);
        response.status(201).send({
          message: "updated",
          id: opinion.id
        });
      } catch (error) {
        response.status(400).send({
          message: "Opinion not found"
        });
      }
    }
  }

  public addLike() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      try {
        //TODO: Get user and throw error if not found
        //TODO: Get userID from users
        await this.opinionService.addLike(opinion.id, "128");
        response.status(201).send({
          message: "Added like",
          id: opinion.id
        });
      } catch (error) {
        response.status(400).send({
          message: "User not found"
        });
      }
    }
  }

  public addDislike() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      try {
        //TODO: Get user and throw error if not found
        //TODO: Get userID from users
        await this.opinionService.addDislike(opinion.id, "128");
        response.status(201).send({
          message: "Added dislike",
          id: opinion.id
        });
      } catch (error) {
        response.status(400).send({
          message: "User not found"
        });
      }
    }
  }

  public getOpinion() {
    return async (request: any, response: any) => {
      let opinionID = request.params.id;
      try {
        let opinion = await this.opinionService.getOpinion(opinionID);
        response.status(201).send(opinion);
      } catch (error) {
        response.status(400).send({
          message: "Invalid opinion"
        });
      }
    }
  }

  public getOpinionsByProduct() {
    return async (request: any, response: any) => {
      let productID = request.params.id;
      try {
        let opinions = await this.opinionService.getOpinionsByProduct(productID);
        response.status(201).send(opinions);
      } catch (error) {
        response.status(400).send({
          message: "Cannot retrieve opinions from database by product ID"
        });
      }
    }
  }

  public getOpinionsByUser() {
    return async (request: any, response: any) => {
      let userID = request.params.id;
      try {
        let opinions = await this.opinionService.getOpinionsByUser(userID);
        response.status(201).send(opinions);
      } catch (error) {
        response.status(400).send({
          message: "Cannot retrieve opinions from database by user ID"
        });
      }
    }
  }

}
