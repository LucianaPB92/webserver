import cloudinary from "../config/cloudinary.js";

// Obtener todas las imágenes (Cloudinary no ofrece esta función directamente en la versión gratuita)
export const obtenerImagenes = async (req, res) => {
  try {
    res.json({ msg: "Para obtener imágenes, usa la URL almacenada en tu base de datos." });
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener imágenes", error });
  }
};

// Subir una imagen
export const subirImagen = async (req, res) => {
  try {
    console.log("Archivo recibido en el backend:", req.file);
    if (!req.file) return res.status(400).json({ msg: "No se ha enviado una imagen" });

    // Subir la imagen a Cloudinary usando una promesa
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "productos" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, public_id: result.public_id });

  } catch (error) {
    res.status(500).json({ msg: "Error en la subida", error });
  }
};

// Actualizar una imagen (Eliminar la anterior y subir una nueva)
export const actualizarImagen = async (req, res) => {
  try {
    const { public_id } = req.params;
    if (!req.file) return res.status(400).json({ msg: "No se ha enviado una imagen nueva" });

    // Eliminar imagen anterior en Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Subir nueva imagen
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "productos" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, public_id: result.public_id });

  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar imagen", error });
  }
};

// Eliminar una imagen
export const eliminarImagen = async (req, res) => {
  try {
    const { public_id } = req.params;

    if (!public_id) return res.status(400).json({ msg: "Falta el public_id de la imagen" });

    // Eliminar de Cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      return res.status(400).json({ msg: "No se pudo eliminar la imagen, verifica el public_id" });
    }

    res.json({ msg: "Imagen eliminada correctamente" });

  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar imagen", error });
  }
};
