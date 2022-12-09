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

export const container = new Container();

container.bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();
container.bind<SessionController>(TYPES.SessionController)
  .to(SessionController)
  .inSingletonScope();

container.bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container.bind<SessionRepository>(TYPES.SessionRepository)
  .to(SessionRepository)
  .inSingletonScope();

container.bind<UserRouter>(TYPES.UserRouter)
  .to(UserRouter)
  .inSingletonScope();
container.bind<SessionRouter>(TYPES.SessionRouter)
  .to(SessionRouter)
  .inSingletonScope();

container.bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();
