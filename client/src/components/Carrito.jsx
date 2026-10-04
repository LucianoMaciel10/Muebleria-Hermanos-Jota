import { useState } from "react";

const TASA_IVA = 0.21;

// Formateador de moneda en pesos argentinos
const formatearMoneda = (monto) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto);

function Carrito({ carrito, setCarrito, onNavigate, setProductoSeleccionado }) {
  const [ventana, setVentana] = useState(null);

  const cambiarCantidad = (id, cambio) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.map((producto) =>
        producto.id === id && producto.cantidad + cambio > 0
          ? { ...producto, cantidad: producto.cantidad + cambio }
          : producto,
      ),
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((carritoAnterior) =>
      carritoAnterior.filter((producto) => producto.id !== id),
    );
  };

  const cerrarVentana = () => setVentana(null);

  // Pregunta antes de vaciar el carrito
  const pedirVaciarCarrito = () => {
    setVentana({
      titulo: "Vaciar carrito",
      mensaje: "¿Estás seguro de que deseas vaciar el carrito?",
      mostrarCancelar: true,
      alAceptar: () => {
        setCarrito([]);
        cerrarVentana();
      },
    });
  };

  // Pregunta antes de finalizar la compra
  const pedirFinalizarCompra = () => {
    setVentana({
      titulo: "Finalizar compra",
      mensaje: "¿Estás seguro de que deseas finalizar la compra?",
      mostrarCancelar: true,
      alAceptar: () =>
        setVentana({
          titulo: "Compra realizada",
          mensaje:
            "¡Gracias por tu compra en Mueblería Hermanos Jota! Procesando el pedido...",
          mostrarCancelar: false,
          alAceptar: () => {
            setCarrito([]);
            cerrarVentana();
          },
        }),
    });
  };

  //  el 21% se suma al subtotal
  const subtotal = carrito.reduce(
    (acumulado, producto) =>
      acumulado + Number(producto.precio) * Number(producto.cantidad),
    0,
  );
  const impuesto = subtotal * TASA_IVA;
  const total = subtotal + impuesto;

  return (
    <section className="pagina-carrito">
      <div className="contenedor-carrito">
        <h1 className="titulo-carrito">Tu carrito</h1>

        {carrito.length === 0 && (
          <div className="mensaje-carrito-vacio">
            <h2>Tu carrito está vacío</h2>
            <button
              type="button"
              className="btn-catalogo"
              onClick={() => onNavigate("productos")}
            >
              Ver el catálogo
            </button>
          </div>
        )}

        {carrito.length > 0 && (
          <div className="layout-carrito">
            <div className="lista-elementos-carrito">
              {carrito.map((producto) => (
                <article key={producto.id} className="elemento-carrito">
                  <div className="elemento-carrito__imagen-contenedor">
                    {producto.imagen && (
                      <img
                        onClick={() => {
                          setProductoSeleccionado(producto.id);
                          onNavigate("productos");
                        }}
                        style={{ cursor: "pointer" }}
                        src={producto.imagen}
                        alt={producto.alt || producto.nombre}
                        className="elemento-carrito__img"
                      />
                    )}
                  </div>

                  <div className="elemento-carrito__detalles">
                    <h3 className="elemento-carrito__titulo">
                      <span
                        onClick={() => {
                          setProductoSeleccionado(producto.id);
                          onNavigate("productos");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {producto.nombre}
                      </span>
                    </h3>
                    <p className="elemento-carrito__precio">
                      {formatearMoneda(producto.precio)}
                    </p>
                  </div>

                  <div className="elemento-carrito__acciones">
                    <div className="controles-cantidad">
                      <button
                        type="button"
                        className="btn-cantidad"
                        onClick={() => cambiarCantidad(producto.id, -1)}
                        aria-label={`Restar uno a ${producto.nombre}`}
                      >
                        -
                      </button>
                      <span className="valor-cantidad">
                        {producto.cantidad}
                      </span>
                      <button
                        type="button"
                        className="btn-cantidad"
                        onClick={() => cambiarCantidad(producto.id, 1)}
                        aria-label={`Sumar uno a ${producto.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    <p className="elemento-carrito__subtotal">
                      {formatearMoneda(producto.precio * producto.cantidad)}
                    </p>
                    <button
                      type="button"
                      className="btn-eliminar"
                      onClick={() => eliminarProducto(producto.id)}
                      aria-label={`Eliminar ${producto.nombre}`}
                    >
                      &times;
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="resumen-pedido">
              <h2>Resumen del pedido</h2>
              <div className="fila-resumen">
                <span>Subtotal</span>
                <span>{formatearMoneda(subtotal)}</span>
              </div>
              <div className="fila-resumen">
                <span>IVA (21%)</span>
                <span>{formatearMoneda(impuesto)}</span>
              </div>
              <div className="fila-resumen total-resumen">
                <span>Total</span>
                <span>{formatearMoneda(total)}</span>
              </div>

              <div className="grupo-botones-carrito">
                <button
                  type="button"
                  className="btn-comprar"
                  onClick={pedirFinalizarCompra}
                >
                  Finalizar compra
                </button>
                <button
                  type="button"
                  className="btn-vaciar"
                  onClick={pedirVaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>

      {ventana && (
        <div className="ventana-emergente-overlay">
          <div
            className="ventana-emergente-caja"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ventana-emergente-titulo"
          >
            <h2
              id="ventana-emergente-titulo"
              className="ventana-emergente-titulo"
            >
              {ventana.titulo}
            </h2>
            <p className="ventana-emergente-mensaje">{ventana.mensaje}</p>
            <div className="ventana-emergente-acciones">
              {ventana.mostrarCancelar && (
                <button
                  type="button"
                  className="btn-ventana-emergente btn-ventana-emergente--cancelar"
                  onClick={cerrarVentana}
                >
                  Cancelar
                </button>
              )}
              <button
                type="button"
                className="btn-ventana-emergente btn-ventana-emergente--aceptar"
                onClick={ventana.alAceptar}
                autoFocus
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Carrito;
