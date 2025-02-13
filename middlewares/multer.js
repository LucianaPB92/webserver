import multer from "multer";

const storage = multer.memoryStorage(); // Almacenar en memoria para enviarlo a Cloudinary

const upload = multer({ storage });

export default upload;
