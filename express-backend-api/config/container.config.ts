import {Container} from "inversify";
import "reflect-metadata";
import {UserRepository} from "../repository/user.repository";
import {TYPES} from "./types.config";
import {SessionRepository} from "../repository/session.repository";
import {UserService} from "../services/user.service";
import {UserController} from "../controller/user.controller";
import {UserRouter} from "../router/user.router";
import {SessionController} from "../controller/session.controller";
import {SessionRouter} from "../router/session.router";
import {SessionService} from "../services/session.service";
import {EmailService} from "../services/email.service";

import {ProfileRepository} from "../repository/profile.repository";
import {ProfileService} from "../services/profile.service";
import {ProfileController} from "../controller/profile.controller";
import {ProfileRouter} from "../router/profile.router";

import {OpinionRepository} from "../repository/opinion.repository";


export const container = new Container();

container.bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();
container.bind<SessionController>(TYPES.SessionController)
  .to(SessionController)
  .inSingletonScope();
container.bind<ProfileController>(TYPES.ProfileController)
  .to(ProfileController)
  .inSingletonScope();

container.bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container.bind<SessionRepository>(TYPES.SessionRepository)
  .to(SessionRepository)
  .inSingletonScope();
container.bind<OpinionRepository>(TYPES.OpinionRepository)
  .to(OpinionRepository)
  .inSingletonScope();
container.bind<ProfileRepository>(TYPES.ProfileRepository)
  .to(ProfileRepository)
  .inSingletonScope();

container.bind<UserRouter>(TYPES.UserRouter)
  .to(UserRouter)
  .inSingletonScope();
container.bind<SessionRouter>(TYPES.SessionRouter)
  .to(SessionRouter)
  .inSingletonScope();
container.bind<ProfileRouter>(TYPES.ProfileRouter)
  .to(ProfileRouter)
  .inSingletonScope();

container.bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();
container.bind<SessionService>(TYPES.SessionService)
  .to(SessionService)
  .inSingletonScope();
container.bind<EmailService>(TYPES.EmailService)
  .to(EmailService)
  .inSingletonScope();
container.bind<ProfileService>(TYPES.ProfileService)
  .to(ProfileService)
  .inSingletonScope();
