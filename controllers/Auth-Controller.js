import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/Token-Manager.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    const {token, expiresIn} = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({
      status: "success",
      msg: {
        token, 
        expiresIn
      },
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(400).json({
        status: "error",
        msg: "El usuario ya existe",
      });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) throw { code: 10000 };
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw { code: 10000 };

    //TODO crear token
    const {token, expiresIn} = generateToken(user.id);

    generateRefreshToken(user.id, res);

    return res.status(200).json({
      status: "success",
      msg:{
        token,
        expiresIn
      }
    });
  } catch (error) {
    if (error.code === 10000) return res.status(403).json({
      status: "error",
      msg: "Credenciales incorrectas",
    });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    if (!user) throw { code: 10000 };
    console.log(user);
    return res.json({
      status: "success",
      msg: {
        email: user.email,
        id: user._id,
      },
    })
  } catch (error) {
    if (error.code === 10000) return res.status(403).json({
      status: "error",
      msg: "Credenciales incorrectas",
    });

    return res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    });
  }
}

export const refreshToken = (req, res) => {
  try {
    const {token, expiresIn} = generateToken(req.uid);

    return res.status(200).json({
      status: "success",
      msg:{
        token,
        expiresIn
      }
    });

  } catch (error) {
    if (error.code === 401) return res.status(401).json({
      status: "error",
      msg: "no existe token",
    });
    
    return res.status(500).json({
      status: "error",
      msg: "Error del servidor: " + error,
    });
  }
}

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    status: "success",
    msg: "Usuario deslogueado",
  });
}