import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";
import {createHash} from "crypto";
import {GithubService} from "../services/githubService";
import moment from "moment";

@injectable()
export class SessionController {
  constructor(@inject(TYPES.UserService) private userService: UserService,
              @inject(TYPES.SessionService) private sessionService: SessionService,
              @inject(TYPES.GithubService) private githubService: GithubService) {
  }

  public login() {
    return async (request: any, response: any) => {
      const email = request.body?.email;
      const password = request.body?.password;

      if (!email) {
        return response.status(400).send({
          message: "Request is missing required 'username' parameter"
        });
      }
      if (!password) {
        return response.status(400).send({
          message: "Request is missing required 'password' parameter"
        });
      }

      try {
        const user = await this.userService.getUserByEmail(email);
        if (this.userService.isGithubUser(user)) {
          return response.status(400).send({
            error: "User is a Github user"
          });
        }
        if (!user.isEmailVerified) {
          return response.status(401).send({
            error: "User email is not verified"
          });
        }
        if(user.password == createHash('sha256').update(password).digest('hex')) {
          const session = await this.sessionService.createSession(user);
          return response.status(201).send(session);
        } else {
          return response.status(401).send({
            error: "Wrong password"
          });
        }
      } catch (error) {
        return response.status(404).send({
          error: "User not found"
        });
      }
    }
  }

  public githubLogin() {
    return async (request: any, response: any) => {
      const githubToken = request.params.github_token;
      try {
        const accessToken = await this.githubService.retrieveAccessToken(githubToken);
        const userEmail = await this.githubService.retrieveUserEmail(accessToken);
        const user = await this.userService.getUserByEmail(userEmail);
        if (!this.userService.isGithubUser(user)) {
          return response.status(400).send({
            error: "User is not a Github user"
          });
        }
        const session = await this.sessionService.createSession(user);
        return response.status(201).send(session);
      } catch (error) {
        return response.status(404).send({
          error: "User not found"
        });
      }
    }
  }

  // public loginWithGithub() {
  //   return async (request: any, response: any) => {
  //
  //   }
  // }

  public logout() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;
      try {
        const ok = await this.sessionService.invalidateSession(sessionId);
        if (ok) {
          return response.status(200).send({
            message: "Logged out successfully"
          });
        } else {
          return response.status(404).send({
            error: "Session not found"
          });
        }
      } catch (error) {
        return response.status(400).send({
          error: "Session is already invalidated"
        });
      }
    }
  }

  public changePassword() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;
      const newPassword = createHash('sha256').update(request.body.newPassword).digest('hex');
      try {
        const session = await this.sessionService.getSession(sessionId);
        let userId = session.userId;
        await this.userService.updatePassword(userId.toString(), newPassword);
        return response.status(200).send({
          message: "Password changed successfully"
        });
      } catch (error) {
        return response.status(404).send({
          message: "Session not found"
        });
      }
    }
  }

  public hasExpired() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;
      try {
        const session = await this.sessionService.getSession(sessionId);
        if (session.expireDate.getTime() < moment(new Date()).add(1, 'h').toDate().getTime()) {
          return response.status(200).send({
            expired: true
          });
        } else {
          return response.status(200).send({
            expired: false
          });
        }
      } catch (error) {
        return response.status(404).send({
          message: "Session not found"
        });
      }
    }
  }

  public getSession() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;

      try {
        const session = await this.sessionService.getSession(sessionId);
        return response.status(200).send(session);
      } catch (error) {
        return response.status(404).send({
          message: "Session not found"
        });
      }
    }
  }
}
