const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema(
    {
        nombre: { 
            type: String, 
            required: [true, "el nombre es obligatorio"],
            unique: true, 
            minlength: [3, "el nombre debe tener al menos 3 caracteres"],
            maxlength: [50, "el nombre debe tener menos de 50 caracteres"],
            trim: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Categoria', categoriaSchema);
