

const formatearPrecio = (numero) =>
  Number(numero).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

function Carrito({ carrito, CambiarCantidad, Eliminar, Vaciar }) {
  const total = carrito.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );

  // Renderizado condicional: carrito vacío
  if (carrito.length === 0) {
    return (
      <section className="carrito-vista">
        <h2>Tu carrito</h2>
        <p>Todavía no agregaste productos.</p>
      </section>
    );
  }

  return (
    <section className="carrito-vista">
      <h2>Tu carrito</h2>

      <table className="carrito-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
           
          </tr>
        </thead>
        <body>
          {carrito.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{formatearPrecio(producto.precio)}</td>
              <td>
                <button
                  onClick={() =>
                    CambiarCantidad(producto.id, producto.cantidad - 1)
                  }
                  disabled={producto.cantidad <= 1}
                  aria-label={`Restar uno a ${producto.nombre}`}
                >
                  −
                </button>
                <span className="carrito-cantidad">{producto.cantidad}</span>
                <button
                  onClick={() =>
                    CambiarCantidad(producto.id, producto.cantidad + 1)
                  }
                  aria-label={`Sumar uno a ${producto.nombre}`}
                >
                  +
                </button>
              </td>
              <td>{formatearPrecio(producto.precio * producto.cantidad)}</td>
              <td>
                <button onClick={() => Eliminar(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </body>
      </table>

      <div className="carrito-pie">
        <strong>Total: {formatearPrecio(total)}</strong>
        <button onClick={Vaciar}>Vaciar carrito</button>
      </div>
    </section>
  );
}

export default Carrito;