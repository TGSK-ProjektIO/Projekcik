import { Component, OnInit } from '@angular/core';
import {Profile} from "../../../express-backend-api/model/profile";
import {User} from "../../../express-backend-api/model/user";
import {ObjectId} from "mongodb";

@Component({
  selector: 'app-panel-uzytkownika',
  templateUrl: './panel-uzytkownika.component.html',
  styleUrls: ['./panel-uzytkownika.component.css']
})
export class PanelUzytkownikaComponent implements OnInit {

  user: User | undefined;
  profile: Profile | undefined;

  constructor() { }

  ngOnInit(): void {

  }

  // ---------- FETCH METHODS ----------

  private async fetchUser(id: string): Promise<User> {
    return await fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/user/${id}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
    ).then((result) => {
      return result;
    }).catch(err => {
      console.error(err);
    });
  }

  private async fetchProfileByUserId(userId: ObjectId | undefined): Promise<Profile> {
    return await fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/getProfile/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
    ).then((result) => {
      return result;
    }).catch(err => {
      console.error(err);
    });
  }

  private async fetchProfileByNickname(nickname: string): Promise<Profile> {
    return await fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/getProfile/${nickname}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()
    ).then((result) => {
      return result;
    }).catch(err => {
      console.error(err);
    });
  }

  private fetchChangeNickname(id: string, nickname: string) {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeNickname/${id}/${nickname}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }

  private fetchChangeProfilePicture(id: string, profilePicture: string) {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeProfilePicture/${id}/${profilePicture}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }

  private fetchChangeDescription(id: string, description: string) {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeDescription/${id}/${description}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      if (response.status === 200) {}
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
  }

}
