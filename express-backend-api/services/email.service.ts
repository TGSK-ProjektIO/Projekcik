import {injectable} from "inversify";
import {User} from "../model/user";

import nodemailer from "nodemailer";


@injectable()
export class EmailService {
    // create reusable transporter object using the default SMTP transport
    private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "opinioncontroller@gmail.com",
      pass: "qjinbqqivdnhhjop" // generated ethereal password
    },
  });

  //todo zmienic w obu metodach receivers na user.email

  public async sendEmailConfirmationMail(user: User): Promise<void> {
    //send mail with defined transport object
    let info = await this.transporter.sendMail({
      from: '"OpinionCollector" <opinioncontroller@gmail.com>', // sender address
      to: "opinioncontroller@gmail.com", // list of receivers
      subject: "Email confirmation", // Subject line
      html: '<p>Click <a href="http://localhost:4200/confirm/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>', // html body
    });
  }


  public async sendPasswordResetMail(user: User): Promise<void> {
    let info = await this.transporter.sendMail({
      from: '"OpinionCollector" <opinioncontroller@gmail.com>', // sender address
      to: "opinioncontroller@gmail.com", // list of receivers
      subject: "Reset password", // Subject line
      html: '<p>Click <a href="http://localhost:4200/reset/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>', // html body
    });
  }
}
