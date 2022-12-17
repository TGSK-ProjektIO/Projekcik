import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValidationService} from "../services/validation.service";

@Component({
  selector: 'app-resetowanie',
  templateUrl: './resetowanie.component.html',
  styleUrls: ['./resetowanie.component.css']
})
export class ResetowanieComponent implements OnInit {
  email = '';
  isSuccessAlertOpen = false;
  isWarningAlertOpen = false;
  isFailureAlertOpen = false;
  isConfirmedAlertOpen = false;

  constructor(
    private router: Router,
    private validationService: ValidationService
  ) { }

  ngOnInit(): void {
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/');
  }

  isEmailValid(): boolean {
    return this.validationService.validateEmail(this.email);
  }

  resetPassword() {
    if (this.isEmailValid()) {
      fetch(`http://localhost:3000/api/v1/logowanie-i-rejestracja/user/send-reset-password-email/${this.email}`, {
        method: 'GET'
      }).then(async response => {
        if (response.status === 200) {
          this.isSuccessAlertOpen = true;
        } else if(response.status === 403) {
          this.isConfirmedAlertOpen = true;
        } else {
          this.isWarningAlertOpen = true;
        }
      }).catch(() => {
        this.isFailureAlertOpen = true;
      });
    }
  }

  onCloseSuccessAlert() {
    this.isSuccessAlertOpen = false;
  }

  onCloseWarningAlert() {
    this.isWarningAlertOpen = false;
  }

  onCloseFailureAlert() {
    this.isFailureAlertOpen = false;
  }
  onCloseConfirmedAlert() {
    this.isConfirmedAlertOpen = false;
  }
}
