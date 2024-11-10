import jwt from "jsonwebtoken";

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    //generar data que vamos a guardar o payload
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PRIVATESECRETKEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };
