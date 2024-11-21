import { Router } from "express";
import { body, check } from "express-validator";
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

routerCat.get("/", [validarJWT], traerCategorias);

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

routerCat.put("/:id", [], actualizarCategoria);

routerCat.delete("/:id", [], borrarCategoria);

export default routerCat;
