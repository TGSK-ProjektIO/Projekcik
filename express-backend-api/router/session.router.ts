import {inject, injectable} from "inversify";
import {SessionController} from "../controller/session.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class SessionRouter {
  constructor(@inject(TYPES.SessionController) private sessionController: SessionController) {
  }

  addRoutes(app: Express): void {
    app.get('/api/v1/logowanie-i-rejestracja/session/:id/has-expired', this.sessionController.hasExpired());
    app.get('/api/v1/logowanie-i-rejestracja/session/:id', this.sessionController.getSession());
    app.post('/api/v1/logowanie-i-rejestracja/session/login', this.sessionController.login());
    // app.post('/api/v1/logowanie-i-rejestracja/session/login/github', this.sessionController.loginWithGithub());
    app.put('/api/v1/logowanie-i-rejestracja/session/:id/logout', this.sessionController.logout());
    app.put('/api/v1/logowanie-i-rejestracja/session/:id/change-password', this.sessionController.changePassword());
  }
}
