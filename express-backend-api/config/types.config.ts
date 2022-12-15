import {SessionService} from "../services/session.service";

const TYPES = {
  UserController: Symbol.for('UserController'),
  SessionController: Symbol.for('SessionController'),
  ProductController: Symbol.for('ProductController'),
  CategoryController: Symbol.for('CategoryController'),

  UserRepository: Symbol.for('UserRepository'),
  SessionRepository: Symbol.for('SessionRepository'),
  ProductRepository: Symbol.for('ProductRepository'),
  CategoryRepository: Symbol.for('CategoryRepository'),

  UserRouter: Symbol.for('UserRouter'),
  SessionRouter: Symbol.for('SessionRouter'),
  ProductRouter: Symbol.for('ProductRouter'),
  CategoryRouter: Symbol.for('CategoryRouter'),

  UserService: Symbol.for('UserService'),
  SessionService: Symbol.for('SessionService'),
  ProductService: Symbol.for('ProductService'),
  CategoryService: Symbol.for('CategoryService'),
};

export { TYPES };
