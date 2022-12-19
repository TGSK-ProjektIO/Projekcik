import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  email = '';
  password = '';

  isAlertBadRequestOpened = false;
  isAlertNotVerifiedEmailOpened = false;
  isAlertWrongPasswordOpened = false;
  isAlertUserNotFoundOpened = false;

  constructor(
    private router: Router,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToRegisterPage() {
    this.router.navigateByUrl('/register');
  }

  redirectToResetPasswordPage() {
    this.router.navigateByUrl('/reset-password');
  }

  isEmailValid(): boolean {
    return this.validationService.validateEmail(this.email);
  }

  isPasswordValid(): boolean {
    return this.validationService.validatePassword(this.password);
  }

  onSignInPressed() {
    if (this.isEmailValid() && this.isPasswordValid()) {
      fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/session/login', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": this.email,
          "password": this.password
        })
      }).then(async response => {
        if (response.status === 201) {
          const body = await response.json();
          localStorage.setItem('sessionId', body._id);
          await this.router.navigateByUrl('/');
        } else if (response.status === 400) {
          this.isAlertBadRequestOpened = true;
        } else if (response.status === 401) {
          const body = await response.json();
          if (body.error === 'Wrong password') {
            this.isAlertWrongPasswordOpened = true;
          } else {
            this.isAlertNotVerifiedEmailOpened = true;
          }
        } else if (response.status === 404) {
          this.isAlertUserNotFoundOpened = true;
        }
      }).catch(err => {
        console.error(err);
      });
    }


  }

  onAlertBadRequestClose() {
    this.isAlertBadRequestOpened = false;
  }

  onAlertNotVerifiedEmailClose() {
    this.isAlertNotVerifiedEmailOpened = false;
  }

  onAlertWrongPasswordClose() {
    this.isAlertWrongPasswordOpened = false;
  }

  onAlertUserNotFoundClose() {
    this.isAlertUserNotFoundOpened = false;
  }
}
