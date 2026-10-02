const express = require("express");
const router = express.Router();
const productos = require("../data/productos");


router.get("/", (req, res) => {
  res.json(productos);
});


router.get("/:id", (req, res, next) => {
  const producto = productos.find((p) => p.id === req.params.id);

  if (!producto) {
    const error = new Error(`Producto con id "${req.params.id}" no encontrado`);
    error.status = 404;
    return next(error);
  }

  res.json(producto);
});

module.exports = router;