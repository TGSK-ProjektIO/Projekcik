import {inject, injectable} from "inversify";
import {UserController} from "../controller/user.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class UserRouter {
  constructor(@inject(TYPES.UserController) private userController: UserController) {

  }

  addRoutes(app: Express): void {
    app.put('/api/v1/logowanie-i-rejestracja/user/confirm-email', this.userController.confirmEmail());
    app.post('/api/v1/logowanie-i-rejestracja/user', this.userController.registerUser());
    app.get('/api/v1/logowanie-i-rejestracja/user/:id', this.userController.getUser());
    app.get('/api/v1/logowanie-i-rejestracja/user/send-reset-password-email/:email', this.userController.sendPasswordResetEmail());
    app.put('/api/v1/logowanie-i-rejestracja/user/reset-password', this.userController.resetPassword());
    app.get('/api/v1/logowanie-i-rejestracja/user/github/register/:code', this.userController.registerGithubUser());
  }
}

