import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {OpinionService} from "../services/opinion.service";
import {SessionService} from "../services/session.service";

@injectable()
export class OpinionController {
  constructor(@inject(TYPES.OpinionService) private opinionService: OpinionService,
              @inject(TYPES.SessionService) private sessionService: SessionService) {
  }

  /** Adds opinion to database
   * @request Opinion object to add
   * @response status
   */
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

  /** Removes opinion from database
   * @request Opinion object to delete
   * @response status
   */
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

  /** Modifies opinion
   * @request Modified Opinion object
   * @response status
   */
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

  /** Adds like to opinion
   * @request   Opinion object to add like to
   * @id        User ID
   * @response  status
   */
  public addLike() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      let userID = request.params.id;
      try {
        await this.opinionService.addLike(opinion.id, userID);
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

  /** Adds dislike to opinion
   * @request   Opinion object to add like to
   * @id        User ID
   * @response  status
   */
  public addDislike() {
    return async (request: any, response: any) => {
      let opinion = request.body;
      let userID = request.params.id;
      try {
        await this.opinionService.addDislike(opinion.id, userID);
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

  /** Get Opinion by ID
   * @id        Opinion ID
   * @response  Opinion/status
   */
  public getOpinion() {
    return async (request: any, response: any) => {
      let opinionID = request.params.id;
      try {
        let opinion = await this.opinionService.getOpinion(opinionID);
        response.status(200).send(opinion);
      } catch (error) {
        response.status(400).send({
          message: "Invalid opinion"
        });
      }
    }
  }

  /** Get Array of product Opinions
   * @id        Product ID
   * @response  Array of Opinions for product/status
   */
  public getOpinionsByProduct() {
    return async (request: any, response: any) => {
      let productID = request.params.id;
      try {
        let opinions = await this.opinionService.getOpinionsByProduct(productID);
        response.status(200).send(opinions);
      } catch (error) {
        response.status(400).send({
          message: "Cannot retrieve opinions from database by product ID"
        });
      }
    }
  }

  /** Get Array of user Opinions
   * @id        User ID
   * @response  Array of Opinions for product/status
   */
  public getOpinionsByUser() {
    return async (request: any, response: any) => {
      let userID = request.params.id;
      try {
        let opinions = await this.opinionService.getOpinionsByUser(userID);
        response.status(200).send(opinions);
      } catch (error) {
        response.status(400).send({
          message: "Cannot retrieve opinions from database by user ID"
        });
      }
    }
  }

}
