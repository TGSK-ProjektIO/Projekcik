import {Profile} from "../model/profile";
import {DATABASE_URi, DB_NAME, PROFILE_COLLECTION_NAME} from "../config/mongo.config";
import {MongoClient, ObjectId} from "mongodb";
import {injectable} from "inversify";

@injectable()
export class ProfileRepository {
  private createClient(): MongoClient {
    return new MongoClient(DATABASE_URi);
  }

  public async setup(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const client = this.createClient();
      const db = client.db(DB_NAME);

      try {
        let collectionExists = await db.listCollections({name: PROFILE_COLLECTION_NAME}).hasNext();
        if (!collectionExists) {
          await db.createCollection(PROFILE_COLLECTION_NAME);
        }
        resolve();
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async create(profile: Profile): Promise<Profile> {
    return new Promise<Profile>(async (resolve, reject) => {
      if (profile._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        if (await collection.count({_id: profile._id}) >= 1
          || await collection.count({nickname: profile.nickname}) >= 1) {
          return reject();
        }
        const response = await collection.insertOne(profile);
        profile._id = response.insertedId;
        resolve(profile);
      } catch (exception) {
        reject();
      } finally {
        await client.close();
      }
    });
  }

  public async read(_id: string): Promise<Profile> {
    return new Promise<Profile>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        let response = await collection.findOne<Profile>({
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

  public async readByUserId(userId: string): Promise<Profile> {
    return new Promise<Profile>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        let response = await collection.findOne<Profile>({
          userId: userId
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

  public async readByNickname(nickname: string): Promise<Profile> {
    return new Promise<Profile>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        let response = await collection.findOne<Profile>({
          nickname: nickname
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

  // Not sure if this is right, but ok
  public async readAll(_id: string): Promise<Array<Profile>> {
    return new Promise<Array<Profile>>(async (resolve, reject) => {
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        const cursor = collection.find<Profile>({});
        let response = (await cursor.toArray());
        // let response = await collection.findOne<Profile>({
        //   _id: new ObjectId(_id)
        // });
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

  public async update(profile: Profile): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      if (!profile._id) {
        return reject();
      }
      const client = this.createClient();
      try {
        const db = client.db(DB_NAME);
        const collection = db.collection(PROFILE_COLLECTION_NAME);
        const response = await collection.updateOne(
          {_id: profile._id},
          {
            $set: {
              nickname: profile.nickname,
              profilePicture: profile.profilePicture,
              description: profile.description,
              isBanned: profile.isBanned,
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
        const collection = db.collection(PROFILE_COLLECTION_NAME);
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
