document.addEventListener("DOMContentLoaded", () => {
    
    const carritoVacio = document.getElementById("carrito-vacio");
    const contenidoCarrito = document.getElementById("contenido-carrito");
    const listaElementosCarrito = document.getElementById("lista-elementos-carrito");
    const subtotalCarrito = document.getElementById("subtotal-carrito");
    const impuestoCarrito = document.getElementById("impuesto-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const botonVaciar = document.getElementById("btn-vaciar");
    const botonComprar = document.getElementById("btn-comprar");

    // Formateador de moneda en pesos argentinos
    const formatearMoneda = (monto) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }).format(monto);
    };

    // Renderizado del carrito
    function renderizarCarrito() {
        const carrito = window.hjCart.get();

        if (carrito.length === 0) {
            carritoVacio.hidden = false;
            contenidoCarrito.hidden = true;
            window.hjCart.updateBadge();
            return;
        }

        carritoVacio.hidden = true;
        contenidoCarrito.hidden = false;
        listaElementosCarrito.innerHTML = "";

        // Renderizar cada elemento del carrito

        carrito.forEach((elemento, indice) => {
            const elementoArticulo = document.createElement("article");
            elementoArticulo.className = "elemento-carrito";
            elementoArticulo.innerHTML = `
                <div class="elemento-carrito__imagen-contenedor">
                    <img src="${elemento.imagen}" alt="${elemento.nombre}" class="elemento-carrito__img">
                </div>
                <div class="elemento-carrito__detalles">
                    <h3 class="elemento-carrito__titulo">${elemento.nombre}</h3>
                    <p class="elemento-carrito__precio">${formatearMoneda(elemento.precio)}</p>
                </div>
                <div class="elemento-carrito__acciones">
                    <div class="controles-cantidad">
                        <button type="button" class="btn-cantidad" data-accion="disminuir" data-indice="${indice}" aria-label="Restar uno">-</button>
                        <span class="valor-cantidad">${elemento.cantidad}</span>
                        <button type="button" class="btn-cantidad" data-accion="aumentar" data-indice="${indice}" aria-label="Sumar uno">+</button>
                    </div>
                    <p class="elemento-carrito__subtotal">${formatearMoneda(elemento.precio * elemento.cantidad)}</p>
                    <button type="button" class="btn-eliminar" data-indice="${indice}" aria-label="Eliminar producto">&times;</button>
                </div>
            `;
            listaElementosCarrito.appendChild(elementoArticulo);
        });

        calcularTotales(carrito);
        window.hjCart.updateBadge();
    }

    // Cálculos de Totales
    function calcularTotales(carrito) {
        const subtotal = carrito.reduce((acumulado, elemento) => acumulado + (Number(elemento.precio) * Number(elemento.cantidad)), 0);
        const impuesto = subtotal * 0.21;
        const total = subtotal + impuesto;

        subtotalCarrito.textContent = formatearMoneda(subtotal);
        impuestoCarrito.textContent = formatearMoneda(impuesto);
        totalCarrito.textContent = formatearMoneda(total);
    }

    // Delegación de eventos para la lista del carrito (sumar, restar, eliminar)
    listaElementosCarrito.addEventListener("click", (evento) => {
        const carrito = window.hjCart.get();

        
        if (evento.target.classList.contains("btn-eliminar")) {
            const indice = evento.target.dataset.indice;
            carrito.splice(indice, 1);
            window.hjCart.set(carrito);
            renderizarCarrito();
            return;
        }

        
        if (evento.target.classList.contains("btn-cantidad")) {
            const indice = evento.target.dataset.indice;
            const accion = evento.target.dataset.accion;

            if (accion === "aumentar") {
                carrito[indice].cantidad += 1;
            } else if (accion === "disminuir") {
                carrito[indice].cantidad -= 1;
                if (carrito[indice].cantidad <= 0) {
                    carrito.splice(indice, 1);
                }
            }

            window.hjCart.set(carrito);
            renderizarCarrito();
        }
    });

    // Vaciar Carrito
    botonVaciar.addEventListener("click", () => {
        if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
            window.hjCart.set([]);
            renderizarCarrito();
        }
    });

    // Simulación de Finalizar Compra
    botonComprar.addEventListener("click", () => {
        alert("¡Gracias por tu compra en Mueblería Hermanos Jota! Procesando el pedido...");
        window.hjCart.set([]);
        renderizarCarrito();
    });

    renderizarCarrito();
});




