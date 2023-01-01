import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {UserService} from "../services/user.service";
import {EmailService} from "../services/email.service";
import {createHash} from "crypto";
import {GithubService} from "../services/githubService";

@injectable()
export class UserController {
 constructor(@inject(TYPES.UserService) private userService: UserService,
             @inject(TYPES.EmailService) private emailService : EmailService,
             @inject(TYPES.GithubService) private githubService: GithubService) {
 }

 public registerGithubUser() {
    return async (request: any, response: any) => {
      const githubCode = request.params.code;
      try {
        const accessToken = await this.githubService.retrieveAccessToken(githubCode);
        const userLogin = await this.githubService.retrieveUserLogin(accessToken);
        const userEmail = await this.githubService.retrieveUserEmail(accessToken);
        const createdUser = await this.userService.registerUser({
          username: userLogin,
          password: null,
          email: userEmail,
          githubToken: accessToken
        });
        response.status(200).send(createdUser);
      } catch (error) {
        response.status(400).send({
          message: error
        });
      }
    }
 }

 public registerUser() {
   return async (request: any, response: any) => {
     let user = request.body;
     try {
       const registeredUser = await this.userService.registerUser(user);
       await this.emailService.sendEmailConfirmationMail(registeredUser);
       response.status(201).send({
         message: "created",
         _id: registeredUser._id
       });
     } catch (error) {
       response.status(400).send({
         message: "Invalid params"
       });
     }
   }
 }

 public sendPasswordResetEmail() {
   return async (request: any, response: any) => {
     const email = request.params.email;
     try {
       const user = await this.userService.getUserByEmail(email);
       if (user.isEmailVerified) {
         await this.emailService.sendPasswordResetMail(user);
         return response.status(200).send({
           message: "Sent password reset email"
         });
       } else {
         return response.status(403).send({
           message: "Cannot send reset password mail to unconfirmed user"
         });
       }
     } catch (e) {
       return response.status(404).send({
         error: "Cannot find user with given email"
       });
     }
   }
 }

 public confirmEmail() {
   return async (request: any, response: any) => {
     let userId = request.body?.userId;
     if (!userId) {
       return response.status(400).send({
         error: "Missing required 'userId' parameter"
       });
     }
     let emailToken = request.body?.emailToken;
     if (!emailToken) {
       return response.status(400).send({
         error: "Missing required 'email' parameter"
       });
     }

     try {
       const result = await this.userService.confirmEmail(userId ,emailToken);
       if (result) {
         return response.status(200).send({
           message: "email verified successfully"
         });
       } else {
         return response.status(400).send({
           error: "Given email token is invalid"
         });
       }
     } catch (error) {
       return response.status(404).send({
         error: "User with given id does not exist"
       });
     }
   }
 }

 public getUser() {
   return async (request: any, response: any) => {
     let userId = request.params.id;

     try {
       const user = await this.userService.getUser(userId);
       return response.status(200).send(user);
     } catch (error) {
       return response.status(404).send({
         message: "User not found"
       });
     }
   }
 }

 public resetPassword() {
   return async (request: any, response: any) => {
     const userId = request.body.userId;
     const emailToken = request.body.emailToken;
     const newPassword = createHash('sha256').update(request.body.newPassword).digest('hex');
     if (!userId) {
       return response.status(400).send({
         error: "Missing required 'userId' parameter"
       });
     }
     if (!emailToken) {
       return response.status(400).send({
         error: "Missing required 'email' parameter"
       });
     }
     if (!newPassword) {
       return response.status(400).send({
         error: "Missing required 'newPassword' parameter"
       });
     }

     try {
       const user = await this.userService.getUser(userId);
       if (user.emailToken !== emailToken) {
         return response.status(400).send({
           error: "Given emailToken is invalid"
         });
       }
       await this.userService.updatePassword(userId, newPassword);
       return response.status(200).send({
         message: "Password changed successfully"
       });
     } catch (error) {
       return response.status(404).send({
         error: "User not found"
       });
     }
   }
 }
}
