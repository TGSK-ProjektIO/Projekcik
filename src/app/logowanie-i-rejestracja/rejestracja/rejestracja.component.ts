import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-rejestracja',
  templateUrl: './rejestracja.component.html',
  styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent implements OnInit {
  username=''
  email=''
  password=''
  confirmPassword=''
  isWarningAlertOpen = false;
  isFailureAlertOpen = false;

  constructor(
    private router: Router,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
  }


  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  redirectToLoginPage() {
    this.router.navigateByUrl('/login');
  }

  isUsernameValid(): boolean {
    return this.validationService.validateUsername(this.username);
  }

  isEmailValid(): boolean {
    return this.validationService.validateEmail(this.email);
  }

  isPasswordValid(): boolean {
    return this.validationService.validatePassword(this.password);
  }

  arePasswordsEqual(): boolean {
    return this.password == this.confirmPassword;
  }

  onSignUpPressed() {
    if (
      this.isUsernameValid()
      && this.isEmailValid()
      && this.isPasswordValid()
      && this.arePasswordsEqual()
    ) {
      const user = {
        username: this.username,
        password: this.password,
        email: this.email
      };
      fetch('http://localhost:3000/api/v1/logowanie-i-rejestracja/user', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      }).then(async response => {
        if (response.status === 201) {
          await this.router.navigateByUrl('/confirm-email');
        } else {
          this.isWarningAlertOpen = true;
        }
      }).catch(err => {
        this.isFailureAlertOpen = true;
      });
    }
  }
  onCloseWarningAlert() {
    this.isWarningAlertOpen = false;
  }

  onCloseFailureAlert() {
    this.isFailureAlertOpen = false;
  }
}
