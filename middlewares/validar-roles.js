const esAdminRole = (req, res, next) => {
  console.log(req.usuario);
  if (!req.usuario) {
    return res.status(401).json({
      msg: "No tienes permisos para realizar esta acción",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(403).json({
      msg: `${nombre} no es un administrador`,
    });
  }
  next();
};

export { esAdminRole };
