import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

import { feedRouter } from "./routes/feed";
import { protectedRouter } from "./routes/protected";
import { userRouter } from "./routes/user/user-router";

const app: express.Application = express();
app.disable("x-powered-by");
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
import mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TestingDB");
////////////////////////////////////////////////////////////////////
// api routes
app.use("/api/user", userRouter);
app.use("/api/secure", protectedRouter);
app.use("/api/feed", feedRouter);

////////////////////////////////////////////////////////////////////
// in production mode run application from dist folder
if (app.get("env") === "production") {
  app.use(express.static(path.join(__dirname, "/../client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  console.log('EXPRESS FINAL MIDDLEWARE ERROR => ', err)
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };