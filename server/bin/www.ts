// #!/usr/bin/env node

// /**
//  * Module dependencies.
//  */

import * as debug from 'debug';
import * as path from 'path'

import * as express from 'express'
import * as http from 'http';
import * as socketIo from "socket.io";

import App from '../App';
import { serverPort } from "../config";

debug('ts-express:server');

const port = normalizePort(process.env.PORT || serverPort);
App.set('port', port);

const server = http.createServer(App);
const io = socketIo(server);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

///////////////////////////////////////////////////////////////////////
let clientListNames = [];

io.on('connect', (socket: any) => {
    // clientListNames.push(socket.handshake.query);
    clientListNames.push(socket);
    // io.emit("updateSocketList", clientListNames);
    io.emit("addUserToSocketList",socket.handshake.query);
    // console.log(clientListNames);
    socket.on('message', (m) => {
        console.log('(message): %s', JSON.stringify(m));
        io.emit('message', m);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

// ////////////////////////////////////////////////////////////////////
// // in production mode run application from dist folder
// if (App.get("env") === "production") {
//   App.use(express.static(path.join(__dirname, "/../client")));
// }

// // catch 404 and forward to error handler
// App.use((req: express.Request, res: express.Response, next) => {
//   const err = new Error("Not Found");
//   next(err);
// });

// production error handler
// no stacktrace leaked to user
App.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  console.log('EXPRESS FINAL MIDDLEWARE ERROR => ', err)
  res.json({
    error: {},
    message: err.message,
  });
});