import {container} from "./config/container.config";
import {TYPES} from "./config/types.config";
import {UserRouter} from "./router/user.router";
import {SessionRouter} from "./router/session.router";
import {ProductRouter} from "./router/product.router";
import {CategoryRouter} from "./router/category.router";
import cors = require('cors');
import {ProfileRouter} from "./router/profile.router";
import {OpinionRouter} from "./router/opinion.router";

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

const userRouter = container.get<UserRouter>(TYPES.UserRouter);
const sessionRouter = container.get<SessionRouter>(TYPES.SessionRouter);
const opinionRouter = container.get<OpinionRouter>(TYPES.OpinionRouter);
const profileRouter = container.get<ProfileRouter>(TYPES.ProfileRouter);

const productRouter = container.get<ProductRouter>(TYPES.ProductRouter);
const categoryRouter = container.get<CategoryRouter>(TYPES.CategoryRouter);

userRouter.addRoutes(app);
sessionRouter.addRoutes(app);
opinionRouter.addRoutes(app);
profileRouter.addRoutes(app);

productRouter.addRoutes(app);
categoryRouter.addRoutes(app);

module.exports = app;
export default app;
