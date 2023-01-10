import {Profile} from "../../../../express-backend-api/model/profile";

export interface ExtendedProfile extends Profile {
  numberOfOpinions: number,
}
