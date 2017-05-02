import { Request, Response, Router } from "express";
import controller from "./user-controller";

const userRouter: Router = Router();

userRouter.route('/')
  .get((req,res,next) => controller.find(req,res,next))
  .post((req,res,next) => controller.create(req,res,next));

userRouter.route('/:id')
  .put((req,res,next) => controller.update(req,res,next))
  .get((req,res,next) => controller.findById(req,res,next))
  .delete((req,res,next) => controller.remove(req,res,next));

userRouter.post('/login', async (req, res, next) => {
  console.log("LOGIN POST ROUTER ", req.body);
    let userFound = await controller.findUser(req,res,next)
    if (userFound) {
      let passwordCheck = await controller.attemptLogin(req,res,next,userFound)
    } else {
      res.status(200).json({ 
        error: 'Invalid Credentials: An account with that username does not exist.' 
      });
    }
  
})

userRouter.post('/register', async (req,res,next) => {
  console.log("REGISTER POST ROUTER ", req.body);
  controller.register(req,res,next)
})

export { userRouter };