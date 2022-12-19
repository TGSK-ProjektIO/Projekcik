import {Component, OnInit} from '@angular/core';
import {Profile} from "../../../express-backend-api/model/profile";
import {User} from "../../../express-backend-api/model/user";

@Component({
  selector: 'app-panel-uzytkownika',
  templateUrl: './panel-uzytkownika.component.html',
  styleUrls: ['./panel-uzytkownika.component.css']
})
export class PanelUzytkownikaComponent implements OnInit {

  public profile!: Profile;
  public user!: User;

  constructor() { }

  ngOnInit(): void {
  }

  // ---------- FETCH METHODS ----------
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
}
