/*En un nuevo archivo ejercicio4.js, usa prompt para preguntarle al usuario:
"¿Cuántos productos desea agregar a la lista?". 
Convierte la respuesta a un número y guárdala en una variable cantidadProductos.
Creá un bucle for que se ejecute desde 1 hasta cantidadProductos.
Dentro del bucle, en cada iteración, usa console.log() para imprimir un mensaje que simule la creación de un producto.
Por ejemplo: "Producto #1 agregado", "Producto #2 agregado", etc.
Al finalizar el bucle, mostrá en la consola un mensaje de resumen: "Se han agregado [cantidadProductos] productos a la lista.".*/ 


let cantidadProductos = Number(prompt('¿Cuántos productos desea agregar a la lista?',));

for(let i = 1; i <= cantidadProductos; i++){
    console.log(`Producto ${i} agreado exitosamente`);
}

console.log(`Se han agregado ${cantidadProductos} productos a la lista`);

