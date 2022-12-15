import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),
  ProfileController: Symbol.for('ProfileController'),
  OpinionController: Symbol.for('OpinionController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
  OpinionRepository: Symbol.for('OpinionRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),
  ProfileRepository: Symbol.for('ProfileRepository'),
  OpinionRouter: Symbol.for('OpinionRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService'),
  ProfileService: Symbol.for('ProfileService'),
  OpinionService: Symbol.for('OpinionService')
};

export { TYPES };
