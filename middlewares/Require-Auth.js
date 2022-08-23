import  jwt  from "jsonwebtoken"
import { tokenVerificationErrors } from "../utils/Token-Manager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if(!token)
      throw {message: "no Bearer"}

    token = token.replace("Bearer ", "");
    
    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) { 
    return res.status(401).json({
      status: "error",
      msg: tokenVerificationErrors[error.message],
    });
    
  }
}