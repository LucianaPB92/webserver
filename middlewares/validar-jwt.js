import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";

const validarJWT = async (req, res, next) => {
  //recibimos el token
  const token = req.header("x-token");
  //si no hay token devolver un mensaje y detener el proceso
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  //validar token
  try {
    //obtener el payload
    const { uid } = jwt.verify(token, process.env.PRIVATESECRETKEY);

    //obtener datos de usuario a partir del id

    const usuario = await Usuario.findById({ _id: uid });

    //verificar el si el usuario existe
    if (!usuario) {
       return res.status(401).json({
        msg: "El usuario no existe en la base de datos",
      });
    }
    //verifico si el usuario esta activo
    /*
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido",
      });
    }
    */
    //creo una request.usuario donde vayan los datos del usuario obtenido
    req.usuario=usuario
    
    
    //si esta todo bien
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "El token no es válido",
    });
  }
};

export { validarJWT };
