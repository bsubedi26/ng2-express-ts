import BaseController from "../../lib/BaseController";
import { userModel } from './user-model';
import * as bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import { secret } from '../../config';

class UserController extends BaseController {
  async findUser(req, res, next): Promise<any> {
    const { username, password } = req.body
    console.log(req.body)
    try {
      let userFound = await this.model.findOne({ username: username })
      console.log('user f', userFound)
      return userFound
    } catch (err) {
      return next(err)
    }
  }

  async attemptLogin(req, res, next, userFound): Promise<any> {
    const { username, password } = req.body
    console.log('attempt', userFound)
    try {
      // check password match
      const matchResult = await bcrypt.compare(password, userFound.password)
      if (matchResult === true) {
        console.log('password matched')
        const user = { id: userFound._id, username: userFound.username, permissions: [] }
        const token = sign(user, secret, { expiresIn: "7d" })
        return res.status(200).json({ jwt: token, user: user })
      } else {
        console.log('password NOT matched')
        return res.status(200).json({ 'error': 'Sorry, the password does not match the username.' })
      
      }
    } catch (err) {
      return next(err)
    }
  }

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
  } catch (err) {
    return next(err)
  }
}



}

export default new UserController(userModel);