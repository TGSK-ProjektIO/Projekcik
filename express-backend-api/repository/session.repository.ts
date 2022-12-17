import {Session} from "../model/session"
import {DATABASE_URi, DB_NAME, SESSION_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {inject, injectable} from "inversify";
import {SessionPartial} from "../model/session.partial";
import {SESSION_DURATION} from "../config/session.config";
import moment from "moment";
import {TYPES} from "../config/types.config";
import {UserRepository} from "./user.repository";

@injectable()
export class SessionRepository {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {

  }

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

  public async create(sessionParams: SessionPartial): Promise<Session> {
    return new Promise<Session>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        // Check if user exists in database
        await this.userRepository.read(sessionParams.userId.toString());
        const db = client.db(DB_NAME);
        const collection = db.collection(SESSION_COLLECTION_NAME);
        const createdSession: any = {
          startDate: sessionParams.startDate,
          expireDate: moment(sessionParams.startDate).add(SESSION_DURATION, 'm').toDate(),
          invalidated: false,
          userId: sessionParams.userId
        };
        const response = await collection.insertOne(createdSession);
        createdSession._id = response.insertedId;
        resolve(createdSession);
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

  public async update(session: Partial<Session>): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!session._id || session.userId) {
        return reject();
      }
      if (session.expireDate || session.startDate) {
        const currentSession = await this.read(session._id.toString());
        if (session.startDate && session.startDate > currentSession.expireDate) {
            return reject();
        }
        if (session.expireDate && currentSession.startDate > session.expireDate) {
          return reject();
        }
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(SESSION_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: session._id},
          {
            $set: session
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


