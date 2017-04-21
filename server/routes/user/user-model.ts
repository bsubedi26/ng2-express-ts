import { Document, Schema, Model, model } from "mongoose";

export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserModel extends IUser, Document {
 fullName(): string;
}

export var UserSchema: Schema = new Schema({
 username: String,
 password: String,
 createdAt: Date,
 email: String,
 firstName: String,
 lastName: String
});

UserSchema.pre("save", next => {
 if (!this.createdAt) {
  this.createdAt = new Date();
 }
 next();
});

UserSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);

import BaseModel from "../../lib/BaseModel";
class UserModel extends BaseModel {}
export const userModel = new UserModel(User);