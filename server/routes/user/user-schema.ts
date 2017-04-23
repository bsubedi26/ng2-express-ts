import { Document, Schema, Model, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserModel extends IUser, Document {
 fullName(): string;
}

export var UserSchema: Schema = new Schema({
 username: { type: String, unique: true },
 password: String,
 createdAt: { type: Date, default: Date.now },
 email: String,
 firstName: String,
 lastName: String
});

// pre save - hash incoming password before saving to db
UserSchema.pre('save', async (next) => {
    const user = this;
    next();
});

UserSchema.methods.fullName = function(): string {
  return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);