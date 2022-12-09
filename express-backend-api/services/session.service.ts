import {inject, injectable} from "inversify";
import {SessionRepository} from "../repository/session.repository";
import {TYPES} from "../config/types.config";
import {Session} from "../model/session";
import {User} from "../model/user";

@injectable()
export class SessionService {
  constructor(@inject(TYPES.SessionRepository) private sessionRepository: SessionRepository) {

  }

  public getSession(id: string): Promise<Session> {
    return this.sessionRepository.read(id);
  }

  public createSession(user: User) : Promise<Session> {
    let newSession = {
      startDate: new Date("2019-01-16"),
      expireDate: new Date("2019-01-17"),
      invalidated: false,
      // @ts-ignore
      userId: user._id
    }
    // @ts-ignore
    return this.sessionRepository.create(newSession);
  }

  public invalidateSession(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      try {
        const session = await this.sessionRepository.read(id);
        session.invalidated = true;
        await this.sessionRepository.update(session);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
}

