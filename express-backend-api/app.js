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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/logowanie-i-rejestracja', logowanieIRejestracja);
app.use('/api/v1/opinie', opinie);
app.use('/api/v1/panel-uzytkownika', panelUzytkownika);
app.use('/api/v1/produkt', produkt);
app.use('/api/v1/sugestie-i-zgloszenia', sugestieIZgloszenia);
app.use('/api/v1/wyszukiwanie', wyszukiwanie);

module.exports = app;
