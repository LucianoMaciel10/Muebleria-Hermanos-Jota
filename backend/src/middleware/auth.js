const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith("Bearer ")) {
    const error = new Error("Token no proporcionado");
    error.status = 401;
    return next(error);
  }

  const token = cabecera.slice(7).trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (error) {
    const err = new Error("Token inválido o vencido");
    err.status = 401;
    return next(err);
  }
}

module.exports = { verificarToken };

function soloAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === "admin") {
    return next();
  }
  const error = new Error("No tenés permiso para realizar esta acción");
  error.status = 403;
  return next(error);
}

module.exports = { verificarToken, soloAdmin };
