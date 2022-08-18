import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
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

UserSchema.pre("save", async function(next){
  const user = this;

  if(!user.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.error(error);
    throw new Error("Fallo al guardar codificando la contraseña");
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword){
  const user = this;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    console.error(error);
    throw new Error("Fallo al comparar la contraseña", error);
  }
}

export const User = mongoose.model("User", UserSchema);