const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: [true, "el nombre es obligatorio"], trim: true },
        descripcion: { type: String, required: [true, "la descripción es obligatoria"], trim: true },
        precio: { type: Number, required: [true, "el precio es obligatorio"], min: [0, "el precio no puede ser negativo"] },
        stock: { type: Number,default: 0, min: [0, "el stock no puede ser negativo"] },
        imagenUrl: { type: String, default: "", trim: true },
        categoria: { type: String, required: [true, "la categoría es obligatoria"] },
        alt: { type: String, default: "", trim: true },
        caracteristicas: { type: [String], default: [], trim: true },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Producto', productoSchema);