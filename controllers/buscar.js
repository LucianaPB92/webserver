import { response, request } from "express";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

//importar los modelos que usaré en la búsqueda
import Categoria from "../models/categoria.js";
import Producto from "../models/producto.js";

//Colecciones permitidas
const coleccionesPermitidas = ["categorias", "productos"];

//función para buscar por categoría
const buscarCategoria = async (termino, res = response) => {
  //verificar si en vez del nombre me manda el id
  //con esto valido si el termino que manda el front es un id y lo valido
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "nombre"
    );
    //si categoria obtuvo algo que me devuelva en un array la categoria, sino que me devuelva un  array vacio
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  //realizar búsqueda por nombre
  //variable para que busque el termino por medio de una expresion regular sin importar si esta en mayusculas o minusculas ("i"). bandera
  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};
// buscar productos
const buscarProducto = async (termino, res = response) => {
  //verificar si en vez del nombre me manda el id
  //con esto valido si el termino que manda el front es un id y lo valido
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    //si categoria obtuvo algo que me devuelva en un array la categoria, sino que me devuelva un  array vacio
    return res.json({
      results: producto ? [producto] : [],
    });
  }
  //realizar búsqueda por nombre
  //variable para que busque el termino por medio de una expresion regular sin importar si esta en  mayusculas o minusculas ("i"). bandera

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre").populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};
const buscar = async (req = request, res = response) => {
  //desestructuro de la request los parametros que van en la url
  const { coleccion, termino } = req.params;

  //verificar si la coleccion es válida
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "categorias":
      buscarCategoria(termino, res);
      break;
    case "productos":
      buscarProducto(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No se generaron las búsquedas",
      });
      break;
  }
};

export default buscar;
