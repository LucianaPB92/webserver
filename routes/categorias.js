import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
import {
  actualizarCategoria,
  agregarCategoria,
  borrarCategoria,
  traerCategorias,
} from "../controllers/categorias.js";

const routerCat = Router();

routerCat.get("/", traerCategorias);

routerCat.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    validarCampos,
  ],
  agregarCategoria
);

routerCat.put("/:id", [validarJWT,esAdminRole,validarCampos], actualizarCategoria);

routerCat.delete("/:id", [validarJWT,esAdminRole,validarCampos], borrarCategoria);

export default routerCat;
