import {Schema, model} from "mongoose";

const UserSchema = new Schema({
  email: {
    type:String, 
    required: true,
    trim:true,
    unique: true,
    lowercase: true,
    index: {
      unique: true
    }
  }, 
  password: {
    type:String, 
    required: true
  }
});

export const User = model("User", UserSchema);