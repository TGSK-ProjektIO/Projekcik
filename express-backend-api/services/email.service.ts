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

  public async sendEmailConfirmationMail(user: User): Promise<void> {
    await this.transporter.sendMail({
      from: '"OpinionCollector" <opinioncontroller@gmail.com>',
      to: user.email,
      subject: "Email confirmation",
      html: '<p>Click <a href="http://localhost:4200/confirm/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>'
    });
  }


  public async sendPasswordResetMail(user: User): Promise<void> {
    await this.transporter.sendMail({
      from: '"OpinionCollector" <opinioncontroller@gmail.com>',
      to: user.email,
      subject: "Reset password",
      html: '<p>Click <a href="http://localhost:4200/reset/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>'
    });
  }
}
