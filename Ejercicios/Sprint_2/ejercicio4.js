// Generador de Lista de Productos
/*
1. En un nuevo archivo ejercicio4.js, usa prompt para preguntarle al usuario: "¿Cuántos productos desea
agregar a la lista?". Convierte la respuesta a un número y guárdala en una variable cantidadProductos.
2. Creá un bucle for que se ejecute desde 1 hasta cantidadProductos.
3. Dentro del bucle, en cada iteración, usa console.log() para imprimir un mensaje que simule la creación de
un producto. Por ejemplo: "Producto #1 agregado", "Producto #2 agregado", etc.
4. Al finalizar el bucle, mostrá en la consola un mensaje de resumen: "Se han agregado [cantidadProductos]
productos a la lista.".
*/

let cantidadProductos = Number(prompt("¿Cuántos productos desea agregar a la lista?"));

// Validación de ingreso del usuario
while (!Number.isInteger(cantidadProductos) || cantidadProductos <= 0) {
    cantidadProductos = Number(prompt("Por favor, ingrese un número entero positivo para la cantidad de productos:"));
}

const listaProductos = [];  // Array para almacenar los productos

// Bucle para agregar productos a la lista
for (let i = 1; i <= cantidadProductos; i++) {
    listaProductos.push(`Producto #${i}`);
    console.log(`Producto #${i} agregado`);
}

console.log(`Se han agregado ${cantidadProductos} productos a la lista.`);
