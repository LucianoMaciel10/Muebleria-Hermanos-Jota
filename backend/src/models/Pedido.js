const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "el usuario es obligatorio"],
    },
    
    items: {
        type: [{
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Producto",
                required: true},
                nombre: {
                    type: String,
                    required: true,
                    trim: true},
                precio: {
                    type: Number,
                    required: true,
                    min: [0, "El precio no puede ser negativo"]},
                cantidad: {
                    type: Number,
                    required: true,
                    min: [1, "La cantidad debe ser al menos 1"] },
   },
      ],

      validate: [(val) => val.length > 0, "El pedido debe contener al menos un producto"],
    },
    subtotal: {
        type: Number,
        required: true,
        min: 0 },
    
    iva: {
        type: Number,
        required: true,
        min: 0 },
     total: {
        type: Number,
        required: true,
        min: 0, },
     },
        { timestamps: true}
     ); 


    module.exports = mongoose.model("Pedido", pedidoSchema);        
