import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {UserService} from "../services/user.service";
import {EmailService} from "../services/email.service";


@injectable()
export class UserController {
 constructor(@inject(TYPES.UserService) private userService: UserService,
             @inject(TYPES.EmailService) private emailService : EmailService) {
 }

 public registerUser() {
   return async (request: any, response: any) => {
     let user = request.body;
     try {
       const registeredUser = await this.userService.registerUser(user);
       await this.emailService.sendEmailConfirmationMail(registeredUser);
       response.status(201).send({
         message: "created",
         id: registeredUser._id
       });
     } catch (error) {
       response.status(400).send({
         message: "Invalid params"
       });
     }
   }
 }

 // public resetPassword() {
 //   return (request: any, response: any) => {
 //     let email = request.body?.email;
 //     if (!email) {
 //       return response.status(400).send({
 //         error: "Missing 'email' parameter"
 //       });
 //     }
 //   }
 // }

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
           message: "email verified successfuly"
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
     if (!userId) {
       return response.status(400).send({
         message: "Request is missing required 'userId' parameter"
       });
     }

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
}
