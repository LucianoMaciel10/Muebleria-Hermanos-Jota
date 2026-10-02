const express = require("express");
const logger = require("./src/middleware/loggs");
const productosRoutes = require("./src/routes/productos.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
