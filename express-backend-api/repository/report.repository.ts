import {Report} from "../model/report";
import {
  DATABASE_URi,
  DB_NAME,
  PROFILE_COLLECTION_NAME,
  REPORT_COLLECTION_NAME,
  USER_COLLECTION_NAME
} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";
import {ReportPartial} from "../model/report.partial";
import {User} from "../model/user";
import {Profile} from "../model/profile";

@injectable()
export class ReportRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: REPORT_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(REPORT_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async create(report: ReportPartial): Promise<Report> {
    return new Promise<Report>(async (resolve, reject) => {
      if (!report.type || !report.description || !report.status || !report.idProduct || !report.idUser) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        //if (await collection.count({id: report.id}) >= 1) {
        //  return reject();
        //}
        //console.log("create:1");
        const response = await collection.insertOne(report);
        const aReport: Report = {
          _id: response.insertedId,
          type: report.type,
          description: report.description,
          status: report.status,
          idProduct: report.idProduct,
          idUser: report.idUser
        };
        resolve(aReport);
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async read(id: string): Promise<Report> {
    return new Promise<Report>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        let response = await collection.findOne<Report>({
          _id: new ObjectId(id)
          //type: 1
        });
        if (response !== null) {
          console.log("here");
          resolve(response);
        } else {
          console.log("aaaa");
          reject();
        }
      } catch (exception) {
        console.log("bbbb");
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async readAll(): Promise<Array<Report>> {
    return new Promise<Array<Report>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const cursor = collection.find<Report>({});
        let response = (await cursor.toArray());
        if (response !== null) {
          resolve(response);
        } else {
          console.log("report:readAll:not_found")
          reject();
        }
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async update(report: Partial<Report>): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!report._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: report._id},
          {
            $set: report
          },
          { upsert: false }
        )
        if (response.modifiedCount === 1) {
          console.log("ale jak")
          resolve();
        } else {
          console.log("1")
          reject();
        }
      } catch (exception) {
        console.log("2")
        reject();
      } finally {
        client.close();
      }
    });
  }

  public async findByCategory(category: number): Promise<Array<Report>> {
    return new Promise<Array<Report>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const cursor = collection.find<Report>({
          type: category
        });
        let response = (await cursor.toArray());
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

  public async findAll(): Promise<Array<Report>> {
    return new Promise<Array<Report>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const cursor = collection.find<Report>({

        });
        let response = (await cursor.toArray());
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

  public async delete(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const result = await collection.deleteOne({
          _id: new ObjectId(id)
        });
        if (result.deletedCount === 1) {
          resolve();
        } else {
          console.log("Ale jakto usunięto więcej...")
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
