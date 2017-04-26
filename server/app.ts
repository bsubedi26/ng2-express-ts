import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
import * as cors from "cors";
import * as http from "http";
import * as logger from 'morgan';

import { feedRouter } from "./routes/feed";
import { protectedRouter } from "./routes/protected";
import { userRouter } from "./routes/user/user-router";

// mongoose/mongoDB configuration
import mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TestingDB");

// Creates and configures an ExpressJS web server.
class App {
  public express: express.Application;
  public server: any;
  
  //Run configuration methods on the Express instance
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(json());
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/api/user", userRouter);
    this.express.use("/api/secure", protectedRouter);
    this.express.use("/api/feed", feedRouter);
  }

}

export default new App().express;