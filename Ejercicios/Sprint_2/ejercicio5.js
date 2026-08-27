/*En un nuevo archivo ejercicio5.js,
1. declara una función llamada aplicarDescuento.
2.Esta función debe aceptar dos parámetros: precio y porcentajeDescuento.
3.Dentro de la función, calcula el monto del descuento y el precio final.
4.La función debe retornar (return) el precio final con el descuento ya aplicado.
5.Fuera de la función, declara el precio de dos productos diferentes de "Mueblería Jota" en variables (ej: precioMesa, precioSofa).
6.Llamá a tu función aplicarDescuento dos veces:
              Una vez para la mesa, con un 10% de descuento.
              Otra vez para el sofá, con un 25% de descuento.
7. Guardá los resultados en nuevas variables (precioFinalMesa, precioFinalSofa).*/











function aplicarElDescuento(precio,porcentajeConDescuento) {  
    const descuento = precio * porcentajeConDescuento / 100;
    const precioFinal = precio - descuento;
    return precioFinal;
}

const precioSilla = 5445.605;
const precioMesa = 10000;

const  precioFinalSilla = aplicarElDescuento(precioSilla, 25);
const precioFinalMesa = aplicarElDescuento(precioMesa, 10);

console.log(`El precio original de la silla es:${precioSilla}. con 25% de descuento queda en ${precioFinalSilla}.`);
console.log(`El precio original de la mesa es:${precioMesa}. con 10% de descuento queda en ${precioFinalMesa}.`);