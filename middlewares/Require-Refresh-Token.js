import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/Token-Manager.js";

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies.refreshToken);
    if(!refreshToken)
      throw {message: "no Bearer"}
    const {uid} = jwt.verify(refreshToken, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: "error",
      msg: tokenVerificationErrors[error.message],
    });
  }
}