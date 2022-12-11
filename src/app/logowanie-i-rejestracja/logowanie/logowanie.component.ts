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

  private invalidLoginFlag = false;

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

  doesAccountExist(): boolean {
    return this.invalidLoginFlag;
  }

  onSignInPressed() {
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
        await this.router.navigateByUrl('/');
      }
      if (response.status === 404) {
        this.invalidLoginFlag = true;
      }
    }).catch(err => {
      console.error(err);
    });
  }
}
