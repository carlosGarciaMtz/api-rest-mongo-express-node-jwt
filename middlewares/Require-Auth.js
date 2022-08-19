import  jwt  from "jsonwebtoken"

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if(!token)
      throw {code: 401}

    token = token.replace("Bearer ", "");
    
    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    if (error.code === 401) return res.status(401).json({
      status: "error",
      msg: "No tienes autorización para realizar esta acción",
    });
    
    return res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    });
    
  }
}