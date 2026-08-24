/*
    Creá un nuevo archivo ejercicio1.js y enlázalo a un index.html.
    Dentro de ejercicio1.js, declara una constante precioBaseSilla y 
    asígnale un valor numérico (ej: 4500.50).
    Declará una constante iva y asígnale el valor 0.21.
    Calculá el valor del IVA para la silla y guárdalo en una variable valorIva.
    Calculá el precio final de la silla (precio base + IVA) y guárdalo en una variable precioFinal.
    Usando console.log(), muestra un resumen en la consola con un formato claro, por ejemplo: 
    Precio Base de la Silla: $4500.5
    IVA: $945.105
    Precio Final: $5445.605
*/

const precioBaseSilla = 4500.50;
const iva = 0.21;
let valorIva = precioBaseSilla * iva;
let precioFinal = precioBaseSilla + valorIva;
console.log(`Precio Base de la silla: $${precioBaseSilla}`);
console.log(`IVA: $${valorIva}`);
console.log(`Precio Final: $${precioFinal}`);
