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
    this.user = this.fetchUser("niewiem");
    if(this.user)
    {
      this.profile = this.fetchProfileByUserId(this.user._id);
    }
  }

  public fetchUser(id: string): User | undefined {
    let user: User | undefined;
    fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/user/${id}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(async response => {
      if (response.status === 200) {
        user = await response.json();
      }
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
    return user;
  }

  public fetchProfileByUserId(userId: ObjectId | undefined): Profile | undefined {
    let profile: Profile | undefined;
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/getProfile/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(async response => {
      if (response.status === 200) {
        profile = await response.json();
      }
      if (response.status === 400) {}
    }).catch(err => {
      console.error(err);
    });
    return profile;
  }

  public fetchProfileByNickname() {


  }

}
