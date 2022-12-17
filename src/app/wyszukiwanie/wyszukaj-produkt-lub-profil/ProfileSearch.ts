import {Profile} from "../../../../express-backend-api/model/profile";

export class ProfileSearch {
  constructor(private _profiles: Profile[]) {
    this._profiles = _profiles;
  }

  getSearchResults(phrase: string): Profile[] {
    return this._profiles.filter(profile => profile.nickname.toLocaleLowerCase().includes(phrase));
  }
}
