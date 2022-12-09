import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService')
};

export { TYPES };
