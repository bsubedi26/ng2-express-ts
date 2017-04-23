import { User } from './user-schema';
import BaseModel from "../../lib/BaseModel";

class UserModel extends BaseModel {}

export const userModel = new UserModel(User);