import {Profile} from "./Profile";

export class ProfileSearch {
  profiles: Profile[] = [];
  constructor() {
    for (let i = 0; i < 100; i++) {
      this.profiles.push(new Profile(i, "nickname" + i, i, i));
    }
  }

  getSearchResults(phrase: string): Profile[] {
    return this.profiles.filter(profile => profile.nickname.toLocaleLowerCase().includes(phrase));
  }
}
