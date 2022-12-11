import { Injectable } from '@angular/core';
import * as EmailValidator from 'email-validator';
const PasswordValidator = require('password-validator');

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private passwordValidator = new PasswordValidator();

  constructor() {
    this.passwordValidator
      .is().min(6)
      .is().max(20)
      .has().uppercase()
      .has().lowercase()
      .has().digits(1)
      .has().not().spaces();
  }

  public validateUsername(username: string): boolean {
    return username.length > 3 && username.length < 20;
  }

  public validateEmail(email: string): boolean {
    return EmailValidator.validate(email);
  }

  public validatePassword(password: string): boolean {
    return this.passwordValidator.validate(password);
  }
}
