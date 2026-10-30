function RutaNoEncontrada(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
}



function ManejadorErrores(err, req, res, next) {
  let status = err.status || 500;
  let mensaje = err.message || "Error interno del servidor";
  let detalles;
  
// faltan campos obligatorios
  if  (err.name === "ValidationError") {
    status = 400;
    detalles = Object.values(err.errors).map((e) => ({
      campo: e.path,
      mensaje:
       e.name === "CastError"
        ? `El valor ${e.value} no es válido para el campo "${e.path}"`
         : e.message,
    }));
mensaje = "Los datos del producto no son válidos"; 
 
 
  }
// El id no tiene formato de ObjectId de Mongo
  if (err.name === "CastError") {
    status = 400;
    mensaje = `El id "${err.value}" no es válido debe ser un id de 24 caracteres.`;
  }
 
  console.error(`Error ${status}: ${mensaje}`);

  const respuesta = { error: { mensaje } };

  if (detalles) {
    respuesta.error.detalles = detalles;
  }

  res.status(status).json(respuesta);
}

module.exports = { RutaNoEncontrada, ManejadorErrores };