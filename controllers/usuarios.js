import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
// import { validationResult } from "express-validator";

const getUsers = async (req = request, res = response) => {
  //   res.send("Petición GET");
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde);
  const total = await Usuario.countDocuments({ estado: true });
  res.json({
    total,
    usuarios,
  });
};

//obtener usuario por id
const getUser = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

const postUsers = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, email, password, rol } = datos;
  
  
  //validar errores

  //obtengo los posibles errores que parten de la req la cual se crea a partir de los checks
  // const errors = validationResult(req)
  //valido si esta variable o array de errores no viene vacio
  /*if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  */
  //---------------------------------------------------------

  const usuario = new Usuario({ 
    nombre, 
    email, 
    password, 
    rol
   });

  //verifico email
  // const existeEmail = await Usuario.findOne({ email });

  /*if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }*/

  //------------------------------------------------------
  //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //guardo en la BD

  await usuario.save();
  res.status(201).json({
    msg: "usuario creado con éxito",
    usuario,
  });

  /*const {nombre, puesto} = req.body
  if (nombre) {
    res.json({
      message: "Peticion POST desde controllers ",
      nombre,
      puesto
    }); 
  }else{
    res.status(400).json({
      message : "Falta el nombre"
    })
  }*/
};

const putUsers = async (req = request, res = response) => {
  const { id } = req.params;

  const { password, _id, email, ...resto } = req.body;

  //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.status(200).json({
    message: "usuario actualizado",
    usuario,
  });
};

const deleteUsers = async (req = request, res = response) => {
  const { id } = req.params;
  //borrado fisico

  // const usuarioBorrado = await Usuario.findByIdAndDelete(id)
  /*
  res.json({
    message:"Usuario eliminado",
    usuarioBorrado
  })
  */
  //inactivar usuario
  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    message: "Usuario eliminado",
    usuarioBorrado,
  });
};
export { getUsers, postUsers, putUsers, deleteUsers, getUser };
