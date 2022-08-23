import express from "express";
import { login, register, infoUser, refreshToken, logout } from "../controllers/Auth-Controller.js";
import { requireToken } from "../middlewares/Require-Auth.js";
import { requireRefreshToken } from "../middlewares/Require-Refresh-Token.js";
import { validatorLogin, validatorRegister } from "../middlewares/Validator-Manager.js";

const router = express.Router();

router.get("/healtcheck", (req, res) => {
    res.json({
      status: 'success',
      message: 'Server is running',
      version: '1.0.0'
    });
});

router.post(
  "/login",
  validatorLogin,
  login);

router.post(
  "/register",
  validatorRegister,
  register);

  router.get("/getUser", requireToken, infoUser);
  router.get("/refresh", requireRefreshToken, refreshToken);
  router.get("/logout", logout);

export default router;