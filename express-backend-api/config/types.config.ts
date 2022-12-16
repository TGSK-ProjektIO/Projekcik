import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),
  ReportController: Symbol.for('ReportController'),
  
  OpinionController: Symbol.for('OpinionController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
  OpinionRepository: Symbol.for('OpinionRepository'),
  ReportRepository: Symbol.for('ReportRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),
  ProfileRouter: Symbol.for('ProfileRouter'),
  OpinionRouter: Symbol.for('OpinionRouter'),
  ReportRouter: Symbol.for('ReportRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService'),
  ProfileService: Symbol.for('ProfileService'),
  OpinionService: Symbol.for('OpinionService')
  ReportService: Symbol.for('ReportService'),
};

export { TYPES };
