import {injectable} from "inversify";
import {User} from "../model/user";

import nodemailer from "nodemailer";


@injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
    name: "gmail.com",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "opinioncontroller@gmail.com",
      pass: "qjinbqqivdnhhjop"
    },
  });

  public async sendEmailConfirmationMail(user: User): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.transporter.sendMail({
          from: '"OpinionCollector" <OpinionCollector@gmail.com>',
          to: user.email,
          subject: "Email confirmation",
          html: '<p>Click <a href="http://localhost:4200/confirm-email/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>'
        });
        resolve();
      } catch (error) {
          console.log(error);
        }
    });
  }

  public async sendPasswordResetMail(user: User): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.transporter.sendMail({
          from: '"OpinionCollector" <OpinionCollector@gmail.com>',
          to: user.email,
          subject: "Reset password",
          html: '<p>Click <a href="http://localhost:4200/reset/' + user._id.toString() + "/" + user.emailToken + '"> here</a> to verify your account.</p>'
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
