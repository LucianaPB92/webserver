import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CNN);
    console.log("Base de datos online");
  } catch (error) {
    throw new Error("Error en la conexión a la base de datos");
  }
};

export { dbConnection };
