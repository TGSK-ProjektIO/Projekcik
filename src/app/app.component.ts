import {Component, DoCheck} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../express-backend-api/model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements DoCheck {
  title = 'Main site';

  userLoggedIn : boolean;
  user: User;

  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.userLoggedInStatus();
  }

  ngDoCheck(): void {
    this.userLoggedInStatus();
  }

  private userLoggedInStatus(): void {
    let sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      this.userLoggedIn = true;
    } else {
      this.userLoggedIn = false;
    }
  }

  signOut(): void {
    localStorage.clear();
  }

  navigateToProfile(): void {
    let sessionId = localStorage.getItem('sessionId');

    fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      this.user = await response.json();
      this.router.navigate(['/profil/panel-profilu', this.user._id])
    }).catch(err => {
      console.error(err);
    });
  }
}
