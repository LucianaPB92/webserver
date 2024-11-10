import Role from "../models/rol.js";
import Usuario from "../models/usuario.js";
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
    throw new Error(`El correo ${email} ya existe`);
  }
};

const existeUsuarioPorId = async (id)=>{
 const existeUsuario = await Usuario.findById(id)
 if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
 }
 //si el usuario existe verifico su estado
 if (!existeUsuario.estado) {
    throw new Error(`El usuario ${existeUsuario.nombre} ya está inactivo`);
    
 }
}
export { rolValido, emailExiste, existeUsuarioPorId };