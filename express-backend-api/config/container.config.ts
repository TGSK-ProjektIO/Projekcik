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

import {ProductController} from "../controller/product.controller";
import {ProductRouter} from "../router/product.router";
import {ProductService} from "../services/product.service";
import {ProductRepository} from "../repository/product.repository";

import {CategoryController} from "../controller/category.controller";
import {CategoryRouter} from "../router/category.router";
import {CategoryService} from "../services/category.service";
import {CategoryRepository} from "../repository/category.repository";

export const container = new Container();

container.bind<UserController>(TYPES.UserController)
  .to(UserController)
  .inSingletonScope();
container.bind<SessionController>(TYPES.SessionController)
  .to(SessionController)
  .inSingletonScope();
container.bind<ProductController>(TYPES.ProductController)
  .to(ProductController)
  .inSingletonScope();
container.bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController)
  .inSingletonScope();

container.bind<UserRepository>(TYPES.UserRepository)
  .to(UserRepository)
  .inSingletonScope();
container.bind<SessionRepository>(TYPES.SessionRepository)
  .to(SessionRepository)
  .inSingletonScope();
container.bind<ProductRepository>(TYPES.ProductRepository)
  .to(ProductRepository)
  .inSingletonScope();
container.bind<CategoryRepository>(TYPES.CategoryRepository)
  .to(CategoryRepository)
  .inSingletonScope();

container.bind<UserRouter>(TYPES.UserRouter)
  .to(UserRouter)
  .inSingletonScope();
container.bind<SessionRouter>(TYPES.SessionRouter)
  .to(SessionRouter)
  .inSingletonScope();
container.bind<ProductRouter>(TYPES.ProductRouter)
  .to(ProductRouter)
  .inSingletonScope();
container.bind<CategoryRouter>(TYPES.CategoryRouter)
  .to(CategoryRouter)
  .inSingletonScope();

container.bind<UserService>(TYPES.UserService)
  .to(UserService)
  .inSingletonScope();
container.bind<SessionService>(TYPES.SessionService)
  .to(SessionService)
  .inSingletonScope();
container.bind<ProductService>(TYPES.ProductService)
  .to(ProductService)
  .inSingletonScope();
container.bind<CategoryService>(TYPES.CategoryService)
  .to(CategoryService)
  .inSingletonScope();
