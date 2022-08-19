import express from "express";
import {body} from 'express-validator';
import { login, register, infoUser, refreshToken, logout } from "../controllers/Auth-Controller.js";
import { requireToken } from "../middlewares/Require-Auth.js";
import { validationResultExpress } from "../middlewares/Validation-Result.js";

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
  [
    body("email", 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "El password debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 })
  ],
  validationResultExpress,
  login);

router.post(
  "/register",
  [
    body("email", 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "El password debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 })
      .custom((value, {req}) => {
        if(value !== req.body.password2){
          throw new Error("Las contraseñas no coinciden");
        }
        return value;
      })
  ],
  validationResultExpress,
  register);

  router.get("/getUser", requireToken, infoUser);
  router.get("/refresh", refreshToken);
  router.get("/logout", logout);

export default router;