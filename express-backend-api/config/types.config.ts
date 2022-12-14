import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),
  ProfileController: Symbol.for('ProfileController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),
  ProfileRouter: Symbol.for('ProfileRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService'),
  ProfileService: Symbol.for('ProfileService')
};

export { TYPES };
