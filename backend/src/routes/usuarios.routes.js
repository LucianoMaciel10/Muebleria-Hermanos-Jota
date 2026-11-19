const express = require("express");
const router = express.Router();
const { verificarToken } = require("../middleware/auth");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/registro", async (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (
    typeof nombre !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    const error = new Error("nombre, email y password deben ser texto");
    error.status = 400;
    return next(error);
  }

  if (!nombre.trim() || !email.trim() || !password.trim()) {
    const error = new Error("Faltan campos obligatorios: nombre, email y password");
    error.status = 400;
    return next(error);
  }

  const usuario = await Usuario.create({ nombre, email, password });

  res.status(201).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    const error = new Error("email y password deben ser texto");
    error.status = 400;
    return next(error);
  }

  if (!email.trim() || !password.trim()) {
    const error = new Error("Faltan campos obligatorios: email y password");
    error.status = 400;
    return next(error);
  }

  const emailNormalizado = email.toLowerCase().trim();
  const usuario = await Usuario.findOne({ email: emailNormalizado });

  if (!usuario) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    return next(error);
  }

  const claveValida = await bcrypt.compare(password, usuario.password);
  if (!claveValida) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    return next(error);
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    token,
    usuario: {
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
});

router.get("/perfil", verificarToken, async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id).select("-password");

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 401;
    return next(error);
  }

  res.status(200).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

module.exports = router;
