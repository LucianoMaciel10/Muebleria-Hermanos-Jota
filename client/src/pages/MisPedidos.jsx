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

        // Token vencido  se cierra la sesión y se manda al login
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

  //   sesión vencida: al login
  if (!token || sesionVencida) return <Navigate to="/login" replace />;

  if (cargando) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;

  if (pedidos.length === 0) {
    return (
      <section>
        <h1>Mis pedidos</h1>
        <p>Todavía no realizaste ningún pedido.</p>
        <Link to="/productos">Ver el catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Mis pedidos</h1>
      {pedidos.map((pedido) => (
        <article key={pedido._id}>
          <h3>Pedido del {formatearFecha(pedido.createdAt)}</h3>
          <ul>
            {pedido.items.map((item) => (
              <li key={item._id}>
                {item.nombre} x{item.cantidad} —{" "}
                {formatearMoneda(item.precio * item.cantidad)}
              </li>
            ))}
          </ul>
          <p>Subtotal: {formatearMoneda(pedido.subtotal)}</p>
          <p>IVA (21%): {formatearMoneda(pedido.iva)}</p>
          <strong>Total: {formatearMoneda(pedido.total)}</strong>
        </article>
      ))}
    </section>
  );
}

export default MisPedidos;