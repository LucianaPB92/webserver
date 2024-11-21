import Categoria from "../models/categoria.js";
//controlador de la ruta de get

const traerCategorias = async (req, res) => {
  //para paginacion
  const { limite = 5, desde = 0 } = req.query;
  //hago la consulta
  const categorias = await Categoria.find({ estado: true })
    .limit(limite)
    .skyp(desde)
    .populate("usuario", "nombre email rol");
    //para traer el total de documentos
  const total = await Categoria.countDocuments({ estado: true });
  res.json({
    total,
    categorias,
  });
};

//controlador de la ruta de post

const agregarCategoria = async (req, res) => {
  //obtenemos del body el nombre, necesario guardarlo en un solo tipo de formato(may o min)
  const nombre = req.body.nombre.toUpperCase();

  //si existe la categoria
  const categoriaEncontrada = await Categoria.findOne({ nombre });
  if (categoriaEncontrada) {
    return res.status(400).json({
      msg: `La categoria ${nombre} ya existe.`,
    });
  }

  //obtengo el id del usuario

  const usuario = req.usuario._id;

  //creamos nueva categoria

  const categoria = new Categoria({ nombre, usuario });

  //guardamos categoria

  categoria.save();

  res.status(200),
    json({
      msg: "Categoría guardada.",
      categoria,
    });
};
//controlador de la ruta de put
const actualizarCategoria = (req, res) => {

};
//controlador de la ruta de delete
const borrarCategoria = (req, res) => {
  
};
export {
  traerCategorias,
  agregarCategoria,
  actualizarCategoria,
  borrarCategoria,
};
