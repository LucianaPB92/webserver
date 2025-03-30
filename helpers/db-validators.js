import dns from "dns/promises";
import Role from "../models/rol.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js"

const rolValido = async (rol) => {
  //buscara el rol dentro de la coleccion
  const esRolValido = await Role.findOne({ rol });
  if (!esRolValido) {
    throw new Error(`${rol} no es un rol válido`);
  }
};

const emailExiste = async (email) => {
  //verifico email
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`Ya existe un usuario registrado con el correo ${email}`);
  }
};

const verificarDominioEmail = async (email) => {
  const dominio = email.split("@")[1];

  try {
    const registrosMX = await dns.resolveMx(dominio);
    
    if (!registrosMX || registrosMX.length === 0) {
      throw new Error("El dominio del email no existe o no puede recibir correos.");
    }
  } catch (error) {
    console.error(`Error verificando dominio ${dominio}:`, error.message);
    throw new Error("El dominio del email no existe o no puede recibir correos.");
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
  //si el usuario existe verifico su estado
  /*if (!existeUsuario.estado) {
    throw new Error(`El usuario ${existeUsuario.nombre} ya está inactivo`);
  }*/
};

//validar Producto por id
const productoExiste = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};
export { rolValido, emailExiste, existeUsuarioPorId, productoExiste,verificarDominioEmail};
