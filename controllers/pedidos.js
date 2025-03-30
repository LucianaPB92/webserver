import mongoose from "mongoose";
import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.js";

// Obtener todos los pedidos
const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("usuario", "nombre email")
      .populate("menu.producto", "nombre precio");
    res.json({ pedidos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener los pedidos" });
  }
};

// Obtener un pedido por ID
const obtenerPedidoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id)
      .populate("usuario", "nombre email")
      .populate("menu.producto", "nombre precio");
    if (!pedido) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }
    res.json({ pedido });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener el pedido" });
  }
};

// Crear un pedido
const crearPedido = async (req, res) => {
  try {
    const { menu, estado } = req.body;
    const usuario = req.usuario;
    const usuarioExiste = await Usuario.findById(usuario);
    if (!usuarioExiste) {
      return res.status(401).json({ msg: "Primero debe iniciar sesión" });
    }
    for (const item of menu) {
      if (!mongoose.Types.ObjectId.isValid(item.producto)) {
        return res
          .status(400)
          .json({ msg: `ID de producto no válido: ${item.producto}` });
      }

      const producto = await Producto.findById(item.producto);
      if (!producto) {
        return res
          .status(404)
          .json({ msg: `Producto no encontrado: ${item.producto}` });
      }
    }

    const nuevoPedido = new Pedido({ usuario, menu, estado });
    await nuevoPedido.save();
    res
      .status(201)
      .json({ msg: "Pedido creado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    console.error("❌ Error en crearPedido:", error);
    res
      .status(500)
      .json({ msg: "Error al crear el pedido", error: error.message });
  }
};

// Actualizar un pedido
const actualizarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const pedidoExistente = await Pedido.findById(id);
    if (!pedidoExistente) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }
    if (req.body.estado !== undefined) {
      pedidoExistente.estado = req.body.estado; // Cambia el estado
    }
    const pedidoActualizado = await Pedido.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!pedidoActualizado) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }
    res.json({ msg: "Pedido actualizado", pedido: pedidoActualizado });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar el pedido" });
  }
};


// Eliminar un pedido
const eliminarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(id);
    if (!pedidoEliminado) {
      return res.status(404).json({ msg: "Pedido no encontrado" });
    }
    res.json({ msg: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el pedido" });
  }
};

export {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
};
