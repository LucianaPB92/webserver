import { Schema, model } from "mongoose";

const ComprasSchema = Schema({
  producto: {
    type: Schema.Types.ObjectId,
  },
  usuario: {
    type: Schema.Types.ObjectId,
  },
});

export default model("Compras", ComprasSchema);