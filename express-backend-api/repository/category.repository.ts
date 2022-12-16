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


 create(category: Category): Promise<Category> {
    return new Promise<Category>(async (resolve, reject) => {
        if (category._id) {
          return reject();
        }
        const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(CATEGORY_COLLECTION_NAME);
          if (await collection.count({_id: category._id}) >= 1) {
            reject();
          }
          const response = await collection.insertOne(category);
          category._id = response.insertedId;
          resolve(category);
        } catch (exception) {
          reject();
        } finally {
          client.close();
        }
      });
}

update(category: Category): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        if (!category._id) {
          return reject();
        }
        const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(CATEGORY_COLLECTION_NAME);
          const response = await collection.updateOne(
            {_id: category._id},
            {
              $set: {
                //atrybuty
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
          client.close();
        }
      });
}

read(_id: string): Promise<Category> {
    return new Promise<Category>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(CATEGORY_COLLECTION_NAME);
        let response = await collection.findOne<Category>({
          _id: new ObjectId(_id)
        });
        if (response !== null) {
          resolve(response);
        } else {
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        client.close();
      }
    });
}

delete(_id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(CATEGORY_COLLECTION_NAME);
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
          client.close();
        }
      });
}

getAllCategories() {
    throw new Error("Method not implemented.");
}

}