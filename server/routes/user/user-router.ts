import { Request, Response, Router } from "express";
import { User } from './user-model';

const userRouter: Router = Router();

const user = {
  address: {
    city: "Gwenborough",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
    street: "Kulas Light",
    suite: "Apt. 556",
    zipcode: "92998-3874",
  },
  company: {
    bs: "harness real-time e-markets",
    catchPhrase: "Multi-layered client-server neural-net",
    name: "Romaguera-Crona",
  },
  email: "Sincere@april.biz",
  id: 1,
  name: "Leanne Graham",
  phone: "1-770-736-8031 x56442",
  username: "Bret",
  website: "hildegard.org",
};

import userController from "./user-controller";

userRouter.route('/')
  .get((req,res,next) => userController.find(req,res,next))
  .post((req,res,next) => userController.create(req,res,next));

userRouter.route('/:id')
  .put((req,res,next) => userController.update(req,res,next))
  .get((req,res,next) => userController.findById(req,res,next))
  .delete((req,res,next) => userController.remove(req,res,next));

userRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  userController.create(req,res,next);
})

userRouter.post('/register', (req,res,next) => {
  console.log('req.body', req.body)
  userController.create(req,res,next);
})

export { userRouter };
