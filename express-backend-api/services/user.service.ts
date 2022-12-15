import {inject, injectable} from "inversify";
import {UserRepository} from "../repository/user.repository";
import {TYPES} from "../config/types.config";
import {User} from "../model/user";
import {UserPartial} from "../model/user.partial";

@injectable()
export class UserService {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {

  }

  public registerUser(user: UserPartial): Promise<User> {
    return this.userRepository.create(user);
  }

  public confirmEmail(userId: string, emailToken: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const user = await this.userRepository.read(userId);
        if (user.emailToken === emailToken) {
          await this.userRepository.update({
            _id: user._id,
            isEmailVerified: true
          });
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        reject();
      }
    });
  }

  public updatePassword(userId: string, newPassword: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const user = await this.userRepository.read(userId);
        user.password = newPassword;
        await this.userRepository.update(user);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public updateUserEmailToken(userId: string, newToken: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const user = await this.userRepository.read(userId);
        user.emailToken = newToken;
        await this.userRepository.update(user);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public getUser(userId: string): Promise<User> {
    return this.userRepository.read(userId);
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.userRepository.readByEmail(email);
  }

  private isGithubAccount(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const account = await this.userRepository.read(id);
        resolve(account.password === null);
      } catch (error) {
        reject();
      }
    });
  }

  private isEmailCorrect(email: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      try {
        await this.userRepository.readByEmail(email);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
}
