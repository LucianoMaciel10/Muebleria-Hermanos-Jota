const express = require("express");
const cors = require("cors");
const logger = require("./src/middleware/loggs");
const productosRoutes = require("./src/routes/productos.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "https://muebleria-hermanos-jota-peach.vercel.app" }));
app.use(logger);
app.use(express.json());
app.use("/api/productos", productosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
