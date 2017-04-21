import BaseController from "../../lib/BaseController";
import { userModel } from "./user-model";

class UserController extends BaseController {
//   login(req,res,next) {
//     const { username, password } = req.body;
//     return this.model.findOne({username: username})
//       .then(doc => {
//         if (!doc) { 
//           return res.status(200).json({ error: 'Invalid Credentials: The username and password does not match.'}); 
//         } 
//         else {
//           bcrypt.compare(password, doc.password, function(err, isMatch) {
//             if (err) throw err;
//             // if incoming password matches the hashed password
//             if (isMatch === true) {
//               console.log('right password');
//               const token = jwt.sign({
//                 id: doc._id,
//                 username: doc.username,
//                 email: doc.email
//               }, config.jwtSecret, {
//                   expiresIn: 60 * 60 * 24 // expires in 24 hours
//               });
//               return res.status(200).json({token});
//             }
//             else {
//               console.log('wrong password');
//               res.status(200).json({
//                   error: 'Sorry, the password does not match the username.'
//               })
//             }

//           })
//         }
//       })
//       .catch(err => next(err));
//   }

//   register(req,res,next) {
//     const { username, password, email } = req.body;
//     return this.model.findOne({username: username})
//       .then(doc => {
//           if (doc) { 
//             console.log('if DOC ', doc)
//             return res.status(200).json({ error: 'Sorry the username already exists. Please select a different username.'}); 
//           } 
//           else {
//             console.log('doesnt exist')
//             this.model.create(req.body)
//             .then(doc => res.status(201).json(doc))
//             .catch(err => next(err));
//           }
//       })
//   }
}

export default new UserController(userModel);