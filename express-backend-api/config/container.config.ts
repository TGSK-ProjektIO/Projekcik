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
import {ReportRepository} from "../repository/report.repository";
import {ReportService} from "../services/report.service";
import {ReportController} from "../controller/report.controller";
import {ReportRouter} from "../router/report.router";

export const container = new Container();

container.bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();
container.bind<SessionController>(TYPES.SessionController)
  .to(SessionController)
  .inSingletonScope();
container.bind<ReportController>(TYPES.ReportController)
  .to(ReportController)
  .inSingletonScope();

container.bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container.bind<SessionRepository>(TYPES.SessionRepository)
  .to(SessionRepository)
  .inSingletonScope();
container.bind<ReportRepository>(TYPES.ReportRepository)
  .to(ReportRepository)
  .inSingletonScope();

container.bind<UserRouter>(TYPES.UserRouter)
  .to(UserRouter)
  .inSingletonScope();
container.bind<SessionRouter>(TYPES.SessionRouter)
  .to(SessionRouter)
  .inSingletonScope();
container.bind<ReportRouter>(TYPES.ReportRouter)
  .to(ReportRouter)
  .inSingletonScope();

container.bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();
container.bind<SessionService>(TYPES.SessionService)
  .to(SessionService)
  .inSingletonScope();
container.bind<ReportService>(TYPES.ReportService)
  .to(ReportService)
  .inSingletonScope();
