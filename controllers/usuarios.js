import { request, response } from "express";
import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";
// import { validationResult } from "express-validator";

const getUsers = async (req=request, res=response)=>{
  const usuarios=await Usuario.find()
  const total=await Usuario.countDocuments()
  res.json({total, usuarios})
}

//obtener usuario por id
const getUser = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
  });
};

const postUsers = async (req, res) => {
  const datos = req.body;

  const { nombre, email, password, rol } = datos;

  // const errors=validationResult(req);
  // if (!errors.isEmpty()){
  //     return res.status(400).json(errors)
  // }

  const usuario = new Usuario({ nombre, email, password, rol });

  //verificar mail
  // const existeEmail = await Usuario.findOne({email})

  // if (existeEmail){
  //     return res.status(400).json({msg: "El correo ya existe"})

  // }

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();
  res.status(201).json({ msg: "Usuario creado con exito!", usuario });
};

const putUsers = async (req, res) => {
  const { id } = req.params;
  const { password, _id, email, ...resto } = req.body; // Excluimos campos no editables

  try {
    // Buscamos al usuario en la base de datos
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        message: `Usuario con id ${id} no encontrado`,
      });
    }

    // Si el usuario está inactivo, lo reactivamos
    if (!usuario.estado) {
      resto.estado = true; // Cambiamos el estado a activo
    }

    // Si se envía una nueva contraseña, la encriptamos
    if (password) {
      const salt = bcrypt.genSaltSync();
      resto.password = bcrypt.hashSync(password, salt);
    }

    // Actualizamos el usuario, incluyendo el estado si fue modificado
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { ...resto },
      { new: true }
    );

    res.status(200).json({
      message: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({
      message: "Hubo un error al actualizar el usuario",
    });
  }
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
