
import mongoose , {Schema} from "mongoose"
// import {IUser} from "../interfaces/userTypes"

export interface IUser  {
    _id:string,
    email: string;
    password: string;
    createdAt: Date;
  }
  
const UserSchema = new mongoose.Schema({
//   name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model<IUser>("User", UserSchema);