import {Category} from "../model/category";
import {DATABASE_URi, DB_NAME, CATEGORY_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class CategoryRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  
 public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: CATEGORY_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(CATEGORY_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
 }
}