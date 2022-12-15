import {container} from "./config/container.config";
import {TYPES} from "./config/types.config";
import {UserRouter} from "./router/user.router";
import {SessionRouter} from "./router/session.router";
import cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logowanieIRejestracja = require('./routes/logowanie-i-rejestracja');
var opinie = require('./routes/opinie');
var panelUzytkownika = require('./routes/panel-uzytkownika');
var produkt = require('./routes/produkt');
var sugestieIZgloszenia = require('./routes/sugestie-i-zgloszenia');
var wyszukiwanie = require('./routes/wyszukiwanie');

var app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/logowanie-i-rejestracja', logowanieIRejestracja);
app.use('/api/v1/opinie', opinie);
app.use('/api/v1/panel-uzytkownika', panelUzytkownika);
app.use('/api/v1/produkt', produkt);
app.use('/api/v1/sugestie-i-zgloszenia', sugestieIZgloszenia);
app.use('/api/v1/wyszukiwanie', wyszukiwanie);

const userRouter = container.get<UserRouter>(TYPES.UserRouter);
const sessionRouter = container.get<SessionRouter>(TYPES.SessionRouter);

userRouter.addRoutes(app);
sessionRouter.addRoutes(app);

export default app;