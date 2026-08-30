const productos = [
    { nombre: "Remera", precio: 10000 },
    { nombre: "Pantalón", precio: 20000 },
    { nombre: "Zapatillas", precio: 30000 }
];   //aca deberia sacarlos de productos.js despuess

const carrito = [];

let total = 0;

function agregarAlCarrito(numero) {
    const productoSeleccionado = productos[numero - 1];

    carrito.push(productoSeleccionado);

    total = total + productoSeleccionado.precio;

    console.log("Producto agregado:", productoSeleccionado.nombre);
    console.log("Carrito:", carrito);
    console.log("Total: $" + total);
}

//esto deberia reemplazarse con botones en la pag real

boton.addEventListener("click", function() {
    agregarAlCarrito(idProducto);
});