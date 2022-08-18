import express from "express";
import {body} from 'express-validator';
import { login, register } from "../controllers/Auth-Controller.js";
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
  "/auth/login",
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
  "/auth/register",
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

export default router;