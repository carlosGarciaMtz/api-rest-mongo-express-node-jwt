import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
  const expiresIn = 60 * 15; // 15 min
  try{
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {expiresIn} );
    return {token, expiresIn};
  }catch(error){
    console.error(error);
  }
}

export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30 * 1000; //1 day

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {expiresIn});
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === "developer"),
      expires: new Date(Date.now()+expiresIn)
    })
  } catch (error) {
    console.log(error);
  }
}

export const tokenVerificationErrors = {
  "invalid signature": "Credenciales incorrectas",
  "jwt expired": "Credenciales caducadas",
  "jwt malformed": "Credenciales incorrectas",
  "invalid token": "Credenciales incorrectas",
  "no Bearer": "Formato incorrecto",
}