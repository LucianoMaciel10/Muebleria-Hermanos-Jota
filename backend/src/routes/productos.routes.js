const express = require("express");
const router = express.Router();
const Producto = require("../models/Producto");

function TextoNormal(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


// GET /api/productos?categoria=
router.get("/", async (req, res) => {
  const { categoria, busqueda } = req.query;
  const filtro = {};

  if (categoria) {
    filtro.categoria = categoria;
  }

  let productos = await Producto.find(filtro).collation({
    locale: "es",
    strength: 1,
  });

  if (busqueda) {
    const termino = TextoNormal(busqueda);
    productos = productos.filter(
      (p) =>
        TextoNormal(p.nombre).includes(termino) ||
        TextoNormal(p.descripcion).includes(termino)
    );
  }

  res.json(productos);
});




router.get("/:id", async (req, res, next) => {
  const producto = await Producto.findById(req.params.id);

  if (!producto) {
    const error = new Error(`Producto con id "${req.params.id}" no encontrado`);
    error.status = 404;
    return next(error);
  }

  res.json(producto);
});


router.post("/", async (req, res, next) => {
  const nuevoProducto = await Producto.create(req.body);
  res.status(201).json(nuevoProducto);
});



router.put("/:id", async (req, res, next) => {
  const productoActualizado = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!productoActualizado) {
    const error = new Error(`Producto con id "${req.params.id}" no encontrado`);
    error.status = 404;
    return next(error);
  }
  res.json(productoActualizado);
});


router.delete("/:id", async (req, res, next) => {
  const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

  if (!productoEliminado) {
    const error = new Error(`Producto con id "${req.params.id}" no encontrado`);
    error.status = 404;
    return next(error);
  }
  res.json({ mensaje : "Producto eliminado correctamente" });
});
module.exports = router;