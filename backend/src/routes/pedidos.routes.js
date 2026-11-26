const express = require("express");
const mongoose = require("mongoose");
const Pedido = require("../models/Pedido");
const Producto = require("../models/Producto");
const { verificarToken } = require("../middleware/auth");

const router = express.Router();
const TASA_IVA = 0.21;

const crearError = (mensaje, status) => {
  const error = new Error(mensaje);
  error.status = status;
  return error;
};

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

    // Unificar ítems repetidos: suma las cantidades por producto
    const cantidadesPorProducto = new Map();
    for (const item of items) {
      cantidadesPorProducto.set(
        item.producto,
        (cantidadesPorProducto.get(item.producto) || 0) + Number(item.cantidad),
      );
    }

    const productos = await Producto.find({
      _id: { $in: [...cantidadesPorProducto.keys()] },
    });

    // Los precios salen de la base, no de lo que manda el cliente
    const itemsPedido = [];
    for (const [productoId, cantidad] of cantidadesPorProducto) {
      const prod = productos.find((p) => p._id.toString() === productoId);
      if (!prod) return next(crearError("Producto no encontrado", 404));
      if (cantidad > prod.stock) {
        return next(crearError(`Stock insuficiente de ${prod.nombre}`, 400));
      }
      itemsPedido.push({
        producto: prod._id,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad,
      });
    }

    const subtotal = itemsPedido.reduce(
      (acumulado, i) => acumulado + i.precio * i.cantidad,
      0,
    );

    const iva = subtotal * TASA_IVA;
    const pedido = await mongoose.connection.transaction(async (session) => {
      // 1. Descontar stock de forma atómica, solo si alcanza
      for (const item of itemsPedido) {
        const resultado = await Producto.updateOne(
          { _id: item.producto, stock: { $gte: item.cantidad } },
          { $inc: { stock: -item.cantidad } },
          { session },
        );
        if (resultado.modifiedCount === 0) {
          throw crearError(`Stock insuficiente de ${item.nombre}`, 400);
        }
      }

      // 2. Crear el pedido en la misma transacción
      const [nuevoPedido] = await Pedido.create(
        [
          {
            usuario: req.usuario.id,
            items: itemsPedido,
            subtotal,
            iva,
            total: subtotal + iva,
          },
        ],
        { session },
      );
      return nuevoPedido;
    });

    res.status(201).json(pedido);
  } catch (err) {
    next(err);
  }
});

//historial del log
router.get("/mis-pedidos", async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).sort({
      createdAt: -1,
    });
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
