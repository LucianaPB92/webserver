import { Schema, model, } from "mongoose";
import mongoose from "mongoose";
const PedidoSchema = Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  menu: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      }
    },
  ],

  estado: {
    type: Boolean,
    default: "true",
  },
});

export default model("Pedido", PedidoSchema);
