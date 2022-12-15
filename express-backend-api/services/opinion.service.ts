import {inject, injectable} from "inversify";
import {OpinionRepository} from "../repository/opinion.repository";
import {TYPES} from "../config/types.config";
import {Opinion} from "../model/opinion";
import {DB_NAME, OPINION_COLLECTION_NAME} from "../config/mongo.config";
import {ObjectId} from "mongodb";
import {OpinionRating} from "../model/opinion.rating";

@injectable()
export class OpinionService {
  constructor(@inject(TYPES.OpinionRepository) private opinionRepository: OpinionRepository) {

  }

  public addOpinion(opinion: Opinion): Promise<Opinion> {
    return this.opinionRepository.create(opinion);
  }

  public removeOpinion(id: string): Promise<void> {
    return this.opinionRepository.delete(id);
  }

  public updateOpinion(opinion: Opinion): Promise<void> {
    return this.opinionRepository.update(opinion);
  }

  public addLike(id: string, userID: string) : Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        if(opinion.userId == userID) resolve(false);

        let foundUser = false;
        if (opinion.opinionRatings.length != 0) {
          for (let opinionRating of opinion.opinionRatings) {
            if (opinionRating.userID === userID) {
              foundUser = true;
              opinionRating.like++;
              opinionRating.dislike = 0;
              if (opinionRating.like === 2) {
                opinionRating.like = 0;
              }
              break;
            }
          }
          if(!foundUser) {
            opinion.opinionRatings.push({userID : userID, like: 0, dislike: 1})
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
        if(opinion.userId == userID) resolve(false);

        let foundUser = false;
        if (opinion.opinionRatings.length != 0) {
          for (let opinionRating of opinion.opinionRatings) {
            if (opinionRating.userID === userID) {
              foundUser = true;
              opinionRating.dislike++;
              opinionRating.like = 0;
              if (opinionRating.dislike === 2) {
                opinionRating.dislike = 0;
              }
              break;
            }
          }
          if(!foundUser) {
            opinion.opinionRatings.push({userID : userID, like: 0, dislike: 1})
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

  public getOpinion(id: string): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        resolve(opinion);
      } catch (error) {
        reject();
      }
    });
  }

  public getOpinionsByProduct(productID: string): Promise<Array<Opinion>> {
    return new Promise<Array<Opinion>>(async (resolve, reject) => {
      try {
        const opinions = await this.opinionRepository.readByProduct(productID);
        resolve(opinions);
      } catch (error) {
        reject();
      }
    });
  }

  public getOpinionsByUser(userID: string): Promise<Array<Opinion>> {
    return new Promise<Array<Opinion>>(async (resolve, reject) => {
      try {
        const opinions = await this.opinionRepository.readByUser(userID);
        resolve(opinions);
      } catch (error) {
        reject();
      }
    });
  }

  // Possibly useless
  // ----------------

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

  public getReview(id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        resolve(opinion.review.text);
      } catch (error) {
        reject();
      }
    });
  }

  public setReview(id: string, text: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        opinion.review.text = text;
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  public getRating(id: string, name: string): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        for (const rating of opinion.ratings) {
          if(rating.name == name) {
            resolve(rating.rating);
          }
        }
      } catch (error) {
        reject();
      }
    });
  }
  public setRating(id: string, name: string, value: number): Promise<boolean>  {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const opinion = await this.opinionRepository.read(id);
        for (const rating of opinion.ratings) {
          if(rating.name == name) {
            rating.rating = value;
            resolve(true);
          }
        }
      } catch (error) {
        reject(false);
      }
    });
  }
}
