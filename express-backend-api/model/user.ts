import {ObjectId} from "mongodb";

export interface User {
  _id: ObjectId;
  username: string;
  password: string | null;
  email: string;
  emailToken: string;
  githubToken: string | null;
  isAdministrator: boolean;
  isEmailVerified: boolean;
}
