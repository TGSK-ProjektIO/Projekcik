import {inject, injectable} from "inversify";
import {SessionRepository} from "../repository/session.repository";
import {TYPES} from "../config/types.config";
import {Session} from "../model/session";
import {User} from "../model/user";
import {Profile} from "../model/profile";
import moment from "moment";
import {ObjectId} from "mongodb";
import {ProfileService} from "./profile.service";

@injectable()
export class SessionService {
  constructor(@inject(TYPES.SessionRepository) private sessionRepository: SessionRepository,
              @inject(TYPES.ProfileService) private profileService: ProfileService){

  }

  public getSession(id: string): Promise<Session> {
    return this.sessionRepository.read(id);
  }

  public createSession(user: User) : Promise<Session> {
    let currentDate = new Date();
    currentDate = moment(currentDate).add(1, 'h').toDate();
    let newSession = {
      startDate: currentDate,
      expireDate: moment(currentDate).add(30, 'm').toDate(),
      invalidated: false,
      // @ts-ignore
      userId: user._id
    }

    // Create new profile if it's missing
    if(this.profileService.getProfileByUserId(user._id.toString()) == null)
    {
      let newProfile = Profile();
      this.profileService.createProfile();
    }

    // @ts-ignore
    return this.sessionRepository.create(newSession);
  }

  public invalidateSession(_id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const session = await this.sessionRepository.read(_id);
        if (session.invalidated) {
          return reject();
        }
        await this.sessionRepository.update({
          _id: session._id,
          invalidated: true
        });
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
}

