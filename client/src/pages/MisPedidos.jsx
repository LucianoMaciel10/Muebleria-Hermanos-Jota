import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const formatearMoneda = (monto) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto);

const formatearFecha = (fecha) =>
  new Date(fecha).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

function MisPedidos() {
  const { token, logout } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [sesionVencida, setSesionVencida] = useState(false);

  useEffect(() => {
    if (!token) return;
    const abortController = new AbortController();

    async function cargarPedidos() {
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const respuesta = await fetch(`${base}/api/pedidos/mis-pedidos`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: abortController.signal,
        });

        // Token vencido: se cierra la sesión y se manda al login
        if (respuesta.status === 401) {
          logout();
          setSesionVencida(true);
          return;
        }

        if (!respuesta.ok)
          throw new Error(`Error ${respuesta.status} al obtener los pedidos`);
        setPedidos(await respuesta.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!abortController.signal.aborted) setCargando(false);
      }
    }

    cargarPedidos();
    return () => abortController.abort();
  }, [token, logout]);

  // Sin sesión (o sesión vencida): al login
  if (!token || sesionVencida) return <Navigate to="/login" replace />;

  return (
    <section className="pagina-carrito">
      <div className="contenedor-carrito">
        <h1 className="titulo-carrito">Mis pedidos</h1>

        {cargando && <p className="pedidos-estado">Cargando pedidos...</p>}

        {error && (
          <p className="pedidos-estado pedidos-estado--error">{error}</p>
        )}

        {!cargando && !error && pedidos.length === 0 && (
          <div className="mensaje-carrito-vacio">
            <h2>Todavía no realizaste ningún pedido</h2>
            <Link to="/productos" className="btn-catalogo">
              Ver el catálogo
            </Link>
          </div>
        )}

        {pedidos.length > 0 && (
          <div className="lista-pedidos">
            {pedidos.map((pedido) => (
              <article key={pedido._id} className="pedido-tarjeta">
                <header className="pedido-encabezado">
                  <h3 className="pedido-fecha">
                    {formatearFecha(pedido.createdAt)}
                  </h3>
                  <span className="pedido-numero">
                    Pedido N° {pedido._id.slice(-6).toUpperCase()}
                  </span>
                </header>

                <ul className="pedido-items">
                  {pedido.items.map((item) => (
                    <li key={item._id} className="pedido-item">
                      <span className="pedido-item__nombre">
                        {item.nombre}
                        <span className="pedido-item__cantidad">
                          x{item.cantidad}
                        </span>
                      </span>
                      <span className="pedido-item__precio">
                        {formatearMoneda(item.precio * item.cantidad)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pedido-resumen">
                  <div className="pedido-fila">
                    <span>Subtotal</span>
                    <span>{formatearMoneda(pedido.subtotal)}</span>
                  </div>
                  <div className="pedido-fila">
                    <span>IVA (21%)</span>
                    <span>{formatearMoneda(pedido.iva)}</span>
                  </div>
                  <div className="pedido-fila pedido-fila--total">
                    <span>Total</span>
                    <span>{formatearMoneda(pedido.total)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MisPedidos;