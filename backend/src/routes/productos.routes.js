const express = require("express");
const router = express.Router();
const productos = require("../data/productos");

function textoNormal(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


// GET /api/productos?categoria=
router.get("/", (req, res) => {
  const { categoria, busqueda } = req.query;
  let resultado = productos;

  if (categoria) {
    resultado = resultado.filter(
      (p) => textoNormal(p.categoria) === textoNormal(categoria)
    );
  }

  if (busqueda) {
    const termino = textoNormal(busqueda);
    resultado = resultado.filter(
      (p) =>
        textoNormal(p.nombre).includes(termino) ||
        textoNormal(p.descripcion).includes(termino)
    );
  }

  res.json(resultado);
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