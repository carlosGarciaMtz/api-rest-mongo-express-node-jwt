import axios from 'axios';
import { validationResult, body, param } from 'express-validator';

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  next();
}

export const validatorRegister = [
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
    }),
  validationResultExpress
]

export const validatorLogin = [
  body("email", 'Formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "El password debe tener al menos 6 caracteres")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
]

export const validateLinks = [
  body("url", "El formato de la url es incorrecto")
  .trim()
  .notEmpty()
  .custom(async value => {
    try {
      await axios.get(value)
      return value;
    } catch (error) {
      throw new Error("No found");
    }
  }),
  validationResultExpress,
]

export const validateParamsLink = [
  param("id", "Formato no valido expressValidator")
  .trim()
  .notEmpty()
  .escape(),
  validationResultExpress,
]