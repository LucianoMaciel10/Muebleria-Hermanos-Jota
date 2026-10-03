function RutaNoEncontrada(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}



function ManejadorErrores(err, req, res, next) {
  const status = err.status || 500;
  console.error(`Error ${status}: ${err.message}`);

  res.status(status).json({
    error: {
      mensaje: err.message || "Error interno del servidor",
    },
  });
}

module.exports = { RutaNoEncontrada, ManejadorErrores };