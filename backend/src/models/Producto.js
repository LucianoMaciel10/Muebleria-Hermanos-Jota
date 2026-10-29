const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: [true, "el nombre es obligatorio"] },
        descripcion: { type: String, required: [true, "la descripción es obligatoria"] },
        precio: { type: Number, required: [true, "el precio es obligatorio"], min: 0 },
        stock: { type: Number,default: 0 [true, "el stock no puede ser negativo"] },
        imagenUrl: { type: String, default: [true, ] },
        categoria: { type: String, required: [true, "la categoría es obligatoria"] },
        alt: { type: String, default: [true, ] },
        caracteristicas: { type: [String], default: [], required: [true, "las características son obligatorias"] },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Producto', productoSchema);