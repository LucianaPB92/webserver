import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs"
import { generarJWT } from "../helpers/genera-jwt.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verificar si existe el email
    const usuario = await Usuario.findOne({email}) 
    if (!usuario) {
        return res.status(400).json({
            msg:"Correo / contraseña no son correctas"
        })
    }
    //verificar si el usuario esta activo
    if (!usuario.estado) {
        return res.status(400).json({
            msg:"Correo / contraseña no son correctas"
        })
    }

    //verificar la contraseña
    const validPassword = bcrypt.compareSync(password,usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            msg:"Correo / contraseña no son correctas"
        })
    }
    //generar el token
    const token = await generarJWT(usuario.id)

    res.status(202).json({
        msg:"Login ok",
        uid: usuario._id,
        token
    })
  } catch (error) {
    res.status(500).json({
      message: "comuniquese con el administrador",
    });
  }
};

export { login };
