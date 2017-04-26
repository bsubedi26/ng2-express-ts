import BaseController from "../../lib/BaseController";
import { userModel } from './user-model';
import * as bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { secret } from '../../config';

class UserController extends BaseController {

  async register(req, res, next) {
    const { username, password, email } = req.body
    try {

      let userFound = await this.model.findOne({ username: username })
      
      if (userFound) {
        return res.status(200).json({ error: 'Sorry the username already exists. Please select a different username.' });
      }
      else {
        console.log('username is available -> try to create')
        try {
          const hash = await bcrypt.hash(req.body.password, 10)
          req.body.password = hash
          let newDoc = await this.model.create(req.body)
          return res.status(201).json(newDoc)
        } 
        catch (err) {
          return next(err)
        }
      }
    } catch(err) {
      return next(err)
    }
  }


  async attemptLogin(req, res, next) {
    const { username, password } = req.body;
    let userFound = await this.model.findOne({ username: username })
    if (!userFound) {
      console.log('NO ACCOUNT FOUND')
      return res.status(200).json({ error: 'Invalid Credentials: An account with that username does not exist.' });
    } else {
      console.log('ACCOUNT FOUND')
      try {
        // check password match
        const matchResult = await bcrypt.compare(password, userFound.password)
        if (matchResult === true) {
          console.log('password matched')
          const user = { id: userFound._id, username: userFound.username, permissions: [] }
          const token = sign({ id: userFound._id, user: userFound.username, permissions: [] }, secret, { expiresIn: "7d" })
          return res.json({ jwt: token, user: user })
        } else {
          console.log('password NOT matched')
          return res.json({ 'error': 'Sorry, the password does not match the username.' })
        }
      }
      catch (err) {
        next(err)
      }
    }
  }

}

export default new UserController(userModel);