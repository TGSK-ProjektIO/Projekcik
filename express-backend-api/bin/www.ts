#!/usr/bin/env node

import {UserRepository} from "../repository/user.repository";
import {DB_NAME, mongo, USER_COLLECTION_NAME} from "../config/mongo.config";

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('express-backend-api:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// const repo = new UserRepository();
// repo.connect().then(() => {
//   repo.create({
//     id: "123",
//     username: "user1",
//     password: null,
//     email: "email@gmail.com",
//     emailToken: "token",
//     isAdministrator: false,
//     isEmailVerified: false
//   }).then(() => {
//     console.log('user created successfully');
//   }).catch(() => {
//     console.log('Failed tgo create user');
//   });
// }).catch(() => {
//   console.log('Failed to connect with database');
// });
// mongo.connect().then(client => {
//   console.log('OK');
//   const db = client.db(DB_NAME);
//   const collection = db.collection(USER_COLLECTION_NAME);
//   collection.insertOne({
//       id: "123",
//       username: "user1",
//       password: null,
//       email: "email@gmail.com",
//       emailToken: "token",
//       isAdministrator: false,
//       isEmailVerified: false
//     }).then(() => {
//     console.log('OK2')
//   }).catch((err) => {
//     console.error("ERROR: " + err);
//   })
// }).catch(err => {
//   console.error(err);
// })

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
