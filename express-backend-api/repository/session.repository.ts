import {Session} from "../model/session"
import {DATABASE_URi, DB_NAME, SESSION_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class SessionRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: SESSION_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(SESSION_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async create(session: Session): Promise<Session> {
    return new Promise<Session>(async (resolve, reject) => {
      if (session._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(SESSION_COLLECTION_NAME);
        if (await collection.count({_id: session._id}) >= 1
        || session.startDate >= session.expireDate) {
          reject();
        }
        const response = await collection.insertOne(session);
        session._id = response.insertedId;
        resolve(session);
      } catch (exception) {
        reject();
      } finally {
        client.close();
      }
    });
  }

  public async read(_id: string): Promise<Session> {
    return new Promise<Session>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(SESSION_COLLECTION_NAME);
        let response = await collection.findOne<Session>({
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

  public async update(session: Session): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!session._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(SESSION_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: session._id},
          {
            $set: {
              invalidated: session.invalidated
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
        const collection = db.collection(SESSION_COLLECTION_NAME);
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
}


