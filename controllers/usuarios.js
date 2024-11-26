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

const postUsers = async (req, res)=>{

  const datos= req.body

  const {nombre, email, password, rol}= datos

  // const errors=validationResult(req);
  // if (!errors.isEmpty()){
  //     return res.status(400).json(errors)
  // }

  const usuario = new Usuario({nombre, email, password, rol})

  //verificar mail
  // const existeEmail = await Usuario.findOne({email})

  // if (existeEmail){
  //     return res.status(400).json({msg: "El correo ya existe"})

  // }

const salt = bcrypt.genSaltSync()
usuario.password = bcrypt.hashSync(password, salt)



await usuario.save()
      res.status(201).json({msg: "Usuario creado con exito!", usuario})

}



const putUsers = async (req, res)=>{
    
  const {id}=req.params;
 
 const {password,_id, email,...resto}=req.body;
 
 const salt = bcrypt.genSaltSync()
 resto.password = bcrypt.hashSync(password, salt)
 
 const usuario = await Usuario.findByIdAndUpdate(id, resto, {new:true})
 
 res.status(200).json({
     message: "Usuario actualizado", usuario
 })
 }
 
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
