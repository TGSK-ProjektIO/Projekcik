import {Opinion} from "../model/opinion";
import {DATABASE_URi, DB_NAME, OPINION_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class OpinionRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: OPINION_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(OPINION_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async create(opinion: Opinion): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      if (opinion._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        if (await collection.count({_id: opinion._id}) >= 1) {
          return reject();
        }
        else {
          if(await collection.count({productId: opinion.productId, userId: opinion.userId}) >= 1) {
            return reject();
          }
        }
        const response = await collection.insertOne(<Opinion>opinion);
        opinion._id = response.insertedId;
        resolve(opinion);
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async readByProduct(productId: string): Promise<Array<Opinion>> {
    return new Promise<Array<Opinion>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        let response = await collection.find<Opinion>({
          productId: productId
        });
        let responseArray = await response.toArray();
        if (responseArray.length != 0) {
          resolve(responseArray);
        } else {
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    })
  }

  public async readByUser(userId: string): Promise<Array<Opinion>> {
    return new Promise<Array<Opinion>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        let response = await collection.find<Opinion>({
          userId: userId
        });
        let responseArray = await response.toArray();
        if (responseArray.length != 0) {
          resolve(responseArray);
        } else {
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    })
  }

  public async read(_id: string): Promise<Opinion> {
    return new Promise<Opinion>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        let response = await collection.findOne<Opinion>({
          _id: new ObjectId(_id)
        });
        if (response !== null) {
          resolve(response);
        } else {
          console.log("NOT FOUND")
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async update(opinion: Opinion): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!opinion._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: opinion._id},
          {
            $set: {
              opinionRatings: opinion.opinionRatings,
              review: opinion.review,
              ratings: opinion.ratings
            }
          },
          { upsert: false }
        )
        if (response.modifiedCount === 1) {
          resolve();
        } else {
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async delete(_id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(OPINION_COLLECTION_NAME);
        const result = await collection.deleteOne({
          _id: _id
        });
        if (result.deletedCount === 1) {
          resolve();
        } else {
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }
}
