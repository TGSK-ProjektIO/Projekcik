import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel-edycji',
  templateUrl: './panel-edycji.component.html',
  styleUrls: ['./panel-edycji.component.css']
})
export class PanelEdycjiComponent implements OnInit {

  constructor(private router: Router) { }

  Id: string | null;
  nickname: string;
  profilePicture: string;
  description: string;

  ngOnInit(): void {
    this.Id = localStorage.getItem("profileId");
  }

  redirectToProfile() {
    this.router.navigateByUrl('/profil');
  }

  private fetchChangeNickname() {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeNickname/${this.Id}/${this.nickname}`, {
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

  private fetchChangeProfilePicture() {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeProfilePicture/${this.Id}/${this.profilePicture}`, {
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

  private fetchChangeDescription() {
    fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/changeDescription/${this.Id}/${this.description}`, {
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
