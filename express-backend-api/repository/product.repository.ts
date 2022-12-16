import {Product} from "../model/product";
import {Category} from "../model/category";
import {DATABASE_URi, DB_NAME, PRODUCT_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class ProductRepository {

  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: PRODUCT_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(PRODUCT_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
 }

 create(product: Product): Promise<Product> {
    return new Promise<Product>(async (resolve, reject) => {
        if (product._id) {
          return reject();
        }
        const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(PRODUCT_COLLECTION_NAME);
          if (await collection.count({_id: product._id}) >= 1) {
            reject();
          }
          const response = await collection.insertOne(product);
          product._id = response.insertedId;
          resolve(product);
        } catch (exception) {
          reject();
        } finally {
          client.close();
        }
      });
  }

 update(product: Product): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        if (!product._id) {
          return reject();
        }
        const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(PRODUCT_COLLECTION_NAME);
          const response = await collection.updateOne(
            {_id: product._id},
            {
              $set: {
                name: product.name,
                description: product.description,
                tag: product.tag,
                categoryId: product.categoryId,
                attribute: product.attribute
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


 read(_id: string): Promise<Product> {
    return new Promise<Product>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PRODUCT_COLLECTION_NAME);
        let response = await collection.findOne<Product>({
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
          const collection = db.collection(PRODUCT_COLLECTION_NAME);
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

getAllProducts() {
    throw new Error("Method not implemented.");
  }

}

