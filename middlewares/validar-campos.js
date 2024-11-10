import { validationResult } from "express-validator"; 

//validar errores
const validarCampos = (req, res, next) => {
  //obtengo los posibles errores que parten de la req la cual se crea a partir de los checks
  const errors = validationResult(req);
  //valido si esta variable o array de errores no viene vacio
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  //si no encuentra errores va a ejecutarse el metodo next
  next()
};

export {validarCampos}