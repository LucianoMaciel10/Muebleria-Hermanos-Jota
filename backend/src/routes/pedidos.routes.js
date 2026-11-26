const express = require('express');
const mongoose = require('mongoose');
const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');
const {verificarToken} = require('../middleware/auth');


const router = express.Router();
const TASA_IVA = 0.21; 

const crearError = (mensaje, status) => {
    const error = new Error(mensaje);
    error.status = status;
    return error;
}

router.use(verificarToken);


// creación de un pedido
router.post("/", async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return next(crearError("El carrito de compras está vacío", 400));
    }

    for (const item of items) {
      const cantidad = Number(item.cantidad);
      if (
        typeof item.producto !== "string" ||
        !mongoose.Types.ObjectId.isValid(item.producto) ||
        !Number.isInteger(cantidad) ||
        cantidad < 1
      ) {
        return next(crearError("Producto inválido", 400));
      }
    }

     const productos = await Producto.find({
      _id: { $in: items.map((i) => i.producto) },
    });


    // Los precios salen de la base, no de lo que manda el cliente
    const itemsPedido = [];
    for (const item of items) {
      const prod = productos.find((p) => p._id.toString() === item.producto);
      if (!prod) return next(crearError("Producto no encontrado", 404));
      if (Number(item.cantidad) > prod.stock) {
        return next(crearError(`Stock insuficiente de ${prod.nombre}`, 400));
      }
      itemsPedido.push({
        producto: prod._id,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: Number(item.cantidad),
      });
    }

     const subtotal = itemsPedido.reduce((acumulado, i) => acumulado + i.precio * i.cantidad, 0);

      const iva = subtotal * TASA_IVA;
    const pedido = await Pedido.create({
      usuario: req.usuario.id,
      items: itemsPedido,
      subtotal,
      iva,
      total: subtotal + iva,
    });

    res.status(201).json(pedido);
  } catch (err) {
    next(err);
  }
});


//historial del log
router.get("/mis-pedidos", async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;