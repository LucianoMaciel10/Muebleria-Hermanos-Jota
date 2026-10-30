const mongoose = require("mongoose");
const conectarDB = require("./config/db");
const Producto = require("./models/Producto");
const productos = require("./data/productos");

async function seed() {
  await conectarDB();

  await Producto.deleteMany({});
  console.log("Colección limpiada");

  await Producto.insertMany(productos);
  console.log(`${productos.length} productos insertados`);

  await mongoose.disconnect();
  console.log("Conexión cerrada");
}

seed();
