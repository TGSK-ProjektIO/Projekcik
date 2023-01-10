import {Profile} from "../../../../express-backend-api/model/profile";
import {ExtendedProfile} from "../model/ExtendedProfile";
export class ProfileSearch {
  constructor(private _profiles: ExtendedProfile[]) {
    this._profiles = _profiles;
  }

  getSearchResults(phrase: string): ExtendedProfile[] {
    return this._profiles.filter(profile => profile.nickname.toLocaleLowerCase().includes(phrase));
  }
}
