import {Report} from "../model/report";
import {DATABASE_URi, DB_NAME, REPORT_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient} from "mongodb";
import {injectable} from "inversify";

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

  public async createReport(report: Report): Promise<Report> {
    return new Promise<Report>(async (resolve, reject) => {
      if (report.id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        if (await collection.count({_id: report.id}) >= 1) {
          return reject();
        }
        const response = await collection.insertOne(report);
        report.id = response.insertedId.toString();
        resolve(report);
      } catch (exception) {
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

  public async deleteReport(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(REPORT_COLLECTION_NAME);
        const result = await collection.deleteOne({
          id: id
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
