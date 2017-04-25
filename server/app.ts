import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as http from "http";
import * as socketIo from "socket.io";
import * as logger from 'morgan';

import { feedRouter } from "./routes/feed";
import { protectedRouter } from "./routes/protected";
import { userRouter } from "./routes/user/user-router";

import mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TestingDB");


// Creates and configures an ExpressJS web server.
class App {
  public express: express.Application;

  //Run configuration methods on the Express instance
  constructor() {
    this.express = express();
    this.middleware();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(json());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(urlencoded({ extended: false }));
    this.express.use("/api/user", userRouter);
    this.express.use("/api/secure", protectedRouter);
    this.express.use("/api/feed", feedRouter);
  }

}

export default new App().express;

// class Server {
//   public server: any;
//   public io: any;
//   public app: any;
//   public port: any;
  
//   constructor() {
//     this.createApp()
//     this.configPort()
//     this.createServer()
//     this.createSockets()
//     this.listen()
//   }

//   createServer() {
//     this.server = http.createServer(this.app);
//   }

//   private configPort(): void {
//     this.port = process.env.PORT || 8000;
//   }

//   private createApp(): void {
//     this.app = express();
//     this.app.use(json());
//     this.app.use(cors());
//     this.app.use(compression());
//     this.app.use(urlencoded({ extended: true }));
//     this.app.use("/api/user", userRouter);
//     this.app.use("/api/secure", protectedRouter);
//     this.app.use("/api/feed", feedRouter);
//   }

//   private createSockets(): void {
//     this.io = socketIo(this.server);
//   }

//   private listen(): void {
//         this.server.listen(this.port, () => {
//             console.log('Running server on port %s', this.port);
//         });

//         this.io.on('connect', (socket: any) => {
//             console.log('Connected client on port %s.', this.port);
//             socket.on('message', (m) => {
//                 console.log('[server](message): %s', JSON.stringify(m));
//                 this.io.emit('message', m);
//             });

//             socket.on('disconnect', () => {
//                 console.log('Client disconnected');
//             });
//         });
//     }

//   public static bootstrap(): Server {
//     return new Server();
//   }

// }

// let server = Server.bootstrap()

// const app: express.Application = express();
// app.disable("x-powered-by");
// app.use(json());
// app.use(cors());
// app.use(compression());
// app.use(urlencoded({ extended: true }));

// ////////////////////////////////////////////////////////////////////
// // api routes
// app.use("/api/user", userRouter);
// app.use("/api/secure", protectedRouter);
// app.use("/api/feed", feedRouter);
// app.get("/api/get/process", (req, res, next) => {
//   return res.status(200).json(process.env)
// })
// ////////////////////////////////////////////////////////////////////
// // in production mode run application from dist folder
// if (app.get("env") === "production") {
//   app.use(express.static(path.join(__dirname, "/../client")));
// }

// // catch 404 and forward to error handler
// app.use((req: express.Request, res: express.Response, next) => {
//   const err = new Error("Not Found");
//   next(err);
// });

// // production error handler
// // no stacktrace leaked to user
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   res.status(err.status || 500);
//   console.log('EXPRESS FINAL MIDDLEWARE ERROR => ', err)
//   res.json({
//     error: {},
//     message: err.message,
//   });
// });

// export { app };