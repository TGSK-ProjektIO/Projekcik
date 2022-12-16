import {User} from "../model/user";
import {DATABASE_URi, DB_NAME, USER_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

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

  public async create(user: User): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      if (user._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(USER_COLLECTION_NAME);
        if (await collection.count({_id: user._id}) >= 1
          || await collection.count({email: user.email}) >= 1) {
          return reject();
        }
        const response = await collection.insertOne(user);
        user._id = response.insertedId;
        resolve(user);
      } catch (exception) {
        reject();
      } finally {
        await client.close();
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
        await client.close();
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
          console.log("NOT FOUND")
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        client.close();
      }
    });
  }

  public async update(user: User): Promise<void> {
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
            $set: {
              username: user.username,
              password: user.password,
              email: user.email,
              emailToken: user.emailToken,
              isAdministrator: user.isAdministrator,
              isEmailVerified: user.isEmailVerified
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

  public async delete(_id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
        try {
          const db = client.db(DB_NAME);
          const collection = db.collection(USER_COLLECTION_NAME);
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
