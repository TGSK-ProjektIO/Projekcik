import {inject, injectable} from "inversify";
import {OpinionRepository} from "../repository/opinion.repository";
import {TYPES} from "../config/types.config";
import {Opinion} from "../model/opinion";
import {DB_NAME, OPINION_COLLECTION_NAME} from "../config/mongo.config";
import {ObjectId} from "mongodb";

@injectable()
export class OpinionService {
  constructor(@inject(TYPES.OpinionRepository) private opinionRepository: OpinionRepository) {

  }

  public addOpinion(opinion: Opinion): Promise<Opinion> {
    return this.opinionRepository.create(opinion);
  }

  public async countLikes(_id: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      const opinion = await this.opinionRepository.read(_id);
      try {
        let likes = 0;
        if(opinion !== null) {
          for (let rating of opinion.opinionRatings){
            if (rating.like == 1) {
              likes++;
            }
          }
        }
        if (opinion !== null) {
          resolve(likes);
        } else {
          console.log("NOT FOUND")
          reject();
        }
      } catch (exception) {
        reject();
      }
    });
  }

  public async countDislikes(_id: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      const opinion = await this.opinionRepository.read(_id);
      try {
        let dislikes = 0;
        if(opinion !== null) {
          for (let rating of opinion.opinionRatings){
            if (rating.dislike == 1) {
              dislikes++;
            }
          }
        }
        if (opinion !== null) {
          resolve(dislikes);
        } else {
          console.log("NOT FOUND")
          reject();
        }
      } catch (exception) {
        reject();
      }
    });
  }

  public addLike(id: string, userID: string) : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        if (opinion.opinionRatings.length != 0) {
          for (let opinionRating of opinion.opinionRatings) {
            if (opinionRating.userID === userID) {
              opinionRating.like++;
              opinionRating.dislike = 0;
              if (opinionRating.like === 2) {
                opinionRating.like = 0;
              }
            }
          }
          await this.opinionRepository.update(opinion);
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        reject();
      }
    });
  }

  public addDislike(id: string, userID: string) : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        if (opinion.opinionRatings.length != 0) {
          for (let opinionRating of opinion.opinionRatings) {
            if (opinionRating.userID === userID) {
              opinionRating.dislike++;
              opinionRating.like = 0;
              if (opinionRating.dislike === 2) {
                opinionRating.dislike = 0;
              }
            }
          }
          await this.opinionRepository.update(opinion);
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        reject();
      }
    });
  }
}
