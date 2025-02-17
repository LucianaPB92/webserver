import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esAdminRole } from "../middlewares/validar-roles.js";
import upload from "../middlewares/multer.js";
import {
    subirImagen,
    obtenerImagenes,
    actualizarImagen,
    eliminarImagen,
  } from "../controllers/cloudinary.js";

const routerCloudinary = Router();



routerCloudinary.get("/get-images", obtenerImagenes); // Obtener todas las imágenes
routerCloudinary.post("/upload", upload.single("imagen"), subirImagen); // Subir imagen
routerCloudinary.put("/update/:public_id", upload.single("imagen"), actualizarImagen); // Actualizar imagen
routerCloudinary.delete("/delete/:public_id", eliminarImagen); // Eliminar imagen

export default routerCloudinary