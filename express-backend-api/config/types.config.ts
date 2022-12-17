import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),
  ProductController: Symbol.for('ProductController'),
  CategoryController: Symbol.for('CategoryController'),
  ProfileController: Symbol.for('ProfileController'),
  OpinionController: Symbol.for('OpinionController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  ProductRepository: Symbol.for('ProductRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),
  ProfileRepository: Symbol.for('ProfileRepository'),
  OpinionRepository: Symbol.for('OpinionRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),
  ProductRouter: Symbol.for('ProductRouter'),
  CategoryRouter: Symbol.for('CategoryRouter'),
  ProfileRouter: Symbol.for('ProfileRouter'),
  OpinionRouter: Symbol.for('OpinionRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService'),
  ProductService: Symbol.for('ProductService'),
  CategoryService: Symbol.for('CategoryService'),
  EmailService: Symbol.for('EmailService'),
  ProfileService: Symbol.for('ProfileService'),
  OpinionService: Symbol.for('OpinionService'),
};

export { TYPES };
