import { Request, Response, Router } from "express";
import userController from "./user-controller";

const userRouter: Router = Router();

userRouter.route('/')
  .get((req,res,next) => userController.find(req,res,next))
  .post((req,res,next) => userController.create(req,res,next));

userRouter.route('/:id')
  .put((req,res,next) => userController.update(req,res,next))
  .get((req,res,next) => userController.findById(req,res,next))
  .delete((req,res,next) => userController.remove(req,res,next));

userRouter.post('/login', (req, res, next) => {
  console.log("LOGIN POST ROUTER ", req.body);
  userController.attemptLogin(req,res,next);
})

userRouter.post('/register', async (req,res,next) => {
  console.log("REGISTER POST ROUTER ", req.body);
  userController.register(req,res,next)
})

export { userRouter };