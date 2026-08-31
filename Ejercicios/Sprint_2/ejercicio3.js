/*
Ejercicio 3: Simulador de Carrito de Compras
Tiempo de resolución estimado: 25 minutos
Objetivo: Practicar el uso del bucle while y la función confirm para crear un flujo interactivo.
Tareas:
En un nuevo archivo ejercicio3.js, inicializá una variable totalCompra en 0.
Iniciá un bucle while que se ejecute mientras el usuario quiera seguir comprando.
Dentro del bucle, usa confirm('¿Desea agregar un producto al carrito?'). La respuesta (true o false) determinará si el bucle continúa.
Si el usuario hace clic en "Aceptar" (true):
• Usá prompt('Ingrese el valor del producto:').
• Importante: Convertí el valor ingresado (que es un string) a un número usando parseFloat().
• Verificá si el valor ingresado es un número válido. Si lo es, súmalo a totalCompra.
Cuando el usuario haga clic en "Cancelar" (false), el bucle terminará.
Fuera del bucle, muestra un alert() con el total de la compra. Por ejemplo: El total de su compra es: $[valor_total].
*/



let totalCompra = 0; //consigna
let seguirComprando = true;

while (seguirComprando) { //condicion del while por consigna

    seguirComprando = confirm("¿Desea agregar un producto al carrito?"); //consigna.

    if (seguirComprando) {

        let valorProducto = prompt("Ingrese el valor del producto:");// consigna
        valorProducto = parseFloat(valorProducto); //consigna

        //tambien deberiamos validar q no pueda ser numero negativo pero no lo dice la consigna
        if (!isNaN(valorProducto)) { 
            totalCompra = totalCompra + valorProducto; //consigna
        } else {
            alert("El valor ingresado no es valido.");
        }
    }
}

alert("El total de su compra es: $" + totalCompra);