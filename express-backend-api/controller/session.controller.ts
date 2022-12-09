import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {UserService} from "../services/user.service";
import {SessionService} from "../services/session.service";

@injectable()
export class SessionController {
  constructor(@inject(TYPES.UserService) private userService: UserService,
              @inject(TYPES.SessionService) private sessionService: SessionService) {
  }

  public login() {
    // return async (request: any, response: any) => {
    //   const username = request.body.username;
    //   const password = request.body.password;
    //
    //   if (!username) {
    //     return response.status(400).send({
    //       message: "Request is missing required 'username' parameter"
    //     });
    //   } if (!password) {
    //     return response.status(400).send({
    //       message: "Request is missing required 'password' parameter"
    //     });
    //   }
    //
    //   try {
    //     const user = this.userService.getUser()
    //     await this.sessionService.createSession()
    //   } catch (error) {
    //
    //   }
    // }
  }

  // public loginWithGithub() {
  //   return async (request: any, response: any) => {
  //
  //   }
  // }

  public logout() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;
      if (!sessionId) {
        return response.status(400).send({
          message: "Request is missing required 'id' parameter"
        });
      }

      try {
        await this.sessionService.invalidateSession(sessionId);
        return response.status(200).send({
          message: "Logged out successfully"
        });
      } catch (error) {
        return response.status(404).send({
          message: "Session not found"
        });
      }
    }
  }

  public changePassword() {
    return async (request: any, response: any) => {
      const sessionId = request.params.id;
      const newPassword = request.body.newPassword;
      if (!sessionId) {
        return response.status(400).send({
          message: "Request is missing required 'id' parameter"
        });
      }
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
      if (!sessionId) {
        return response.status(400).send({
          message: "Request is missing required 'id' parameter"
        });
      }
      try {
        const session = await this.sessionService.getSession(sessionId);
        if (session.expireDate < new Date()) {
          return response.status(200).send({
            message: "Session has expired"
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
      if (!sessionId) {
        return response.status(400).send({
          message: "Request is missing required 'id' parameter"
        });
      }

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
