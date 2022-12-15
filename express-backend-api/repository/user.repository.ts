import {User} from "../model/user";
import {DATABASE_URi, DB_NAME, USER_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";
import {UserPartial} from "../model/user.partial";
import {SHA256} from "crypto-ts";
import {createHash, Hmac, randomBytes} from "crypto";

@injectable()
export class UserRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

 public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: USER_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(USER_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
 }

  public async create(userParams: UserPartial): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      if (!userParams.username || !userParams.email || !userParams.password) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        if (await collection.count({email: userParams.email}) >= 1) {
          return reject();
        }
        const createdUser: any = {
          username: userParams.username,
          password: createHash('sha256').update(userParams.password).digest('hex'),
          email: userParams.email,
          emailToken: randomBytes(64).toString('hex'),
          isAdministrator: false,
          isEmailVerified: false
        };
        const response = await collection.insertOne(createdUser);
        createdUser._id = response.insertedId;
        resolve(createdUser);
      } catch (exception) {
        reject();
      } finally {
        client.close();
      }
    });
  }

  public async readByEmail(email: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        let response = await collection.findOne<User>({
          email: email
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
    })
  }

  public async read(_id: string): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        let response = await collection.findOne<User>({
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

  public async update(user: Partial<User>): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!user._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: user._id},
          {
            $set: user
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

  public async delete(_id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(USER_COLLECTION_NAME);
          const result = await collection.deleteOne({
            _id: new ObjectId(_id)
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
}
