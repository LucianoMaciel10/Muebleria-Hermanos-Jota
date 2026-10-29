const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        precio: { type: Number, required: true, min: 0 },
        stock: { type: Boolean, required: true, min: 0 },
        imagenUrl: { type: String, required: true },
        categoria: { type: String, required: true },
        alt: { type: String, required: true },
        caracteristicas: { type: [String], default: [] }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Producto', productoSchema);