const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const Producto = require("./models/Producto");
const Categoria = require("./models/Categoria");
const productos = require("./data/productos");

async function seed() {
  await conectarDB();

  await Producto.deleteMany({});
  await Categoria.deleteMany({});
  console.log("Colecciones limpiadas");

  const nombres = [...new Set(productos.map((p) => p.categoria))];
  const categorias = await Categoria.insertMany(
    nombres.map((nombre) => ({ nombre })),
  );
  const idsPorNombre = Object.fromEntries(
    categorias.map((c) => [c.nombre, c._id]),
  );

  const productosConRef = productos.map((p) => ({
    ...p,
    categoria: idsPorNombre[p.categoria],
  }));

  await Producto.insertMany(productosConRef);
  console.log(
    `${categorias.length} categorías y ${productosConRef.length} productos insertados`,
  );

  await mongoose.disconnect();
  console.log("Conexión cerrada");
}

seed();
