import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const base = import.meta.env.VITE_API_URL || "";

function ProductDetail({ carrito, onAgregar, onProductoModificado }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState("1");
  const [confirmandoEliminar, setConfirmandoEliminar] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const enCarrito = carrito.find((item) => item._id === id)?.cantidad || 0;
  const disponibles = producto ? producto.stock - enCarrito : 0;
  const cantidadValida = Math.min(
    Math.max(1, parseInt(cantidad, 10) || 1),
    Math.max(disponibles, 1),
  );

  useEffect(() => {
    const abortController = new AbortController();
    async function cargarProducto() {
      setCargando(true);
      setError(null);
      setCantidad("1");
      try {
        const respuesta = await fetch(`${base}/api/productos/${id}`, {
          signal: abortController.signal,
        });
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status} al obtener el producto`);
        }
        const data = await respuesta.json();
        setProducto(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!abortController.signal.aborted) setCargando(false);
      }
    }
    cargarProducto();
    return () => abortController.abort();
  }, [id]);

  const eliminarProducto = async () => {
    setEliminando(true);
    try {
      const respuesta = await fetch(`${base}/api/productos/${id}`, {
        method: "DELETE",
      });
      if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.error?.mensaje || `Error ${respuesta.status}`);
      }
      toast.success(`${producto.nombre} eliminado correctamente.`, {
        position: "top-center",
        duration: 4000,
      });
      onProductoModificado();
      navigate("/productos");
    } catch (err) {
      toast.error(`No pudimos eliminar el producto. ${err.message}`, {
        position: "top-center",
        duration: 4000,
      });
      setEliminando(false);
      setConfirmandoEliminar(false);
    }
  };

  if (cargando) {
    return (
      <section className="product-detail">
        <div className="container">
          <p role="status">Cargando producto...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product-detail">
        <div className="container">
          <p role="alert">No pudimos cargar el producto. {error}</p>
          <Link to="/productos" className="btn-vaciar">
            ← Volver al catálogo
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail" aria-labelledby="product-detail-title">
      <div className="container">
        <Link to="/productos" className="btn-vaciar">
          ← Volver al catálogo
        </Link>

        <div className="product-detail__content">
          <div className="product-detail__media">
            <img
              src={producto.imagenUrl}
              alt={producto.alt}
              className="product-detail__image"
            />
          </div>

          <div className="product-detail__info">
            <p className="eyebrow">{producto.categoria}</p>
            <h1 className="product-detail__title" id="product-detail-title">
              {producto.nombre}
            </h1>
            <p className="product-detail__description">
              {producto.descripcion}
            </p>
            <p className="product-detail__price">
              $ {producto.precio.toLocaleString("es-AR")}
            </p>
            <p className="product-detail__stock">
              {producto.stock ? "En stock" : "Sin stock"}
            </p>

            <div className="product-detail__purchase">
              <label htmlFor="product-quantity">Cantidad</label>
              <div className="product-detail__purchase-controls">
                <input
                  type="number"
                  id="product-quantity"
                  name="cantidad"
                  min="1"
                  max={disponibles}
                  step="1"
                  inputMode="numeric"
                  disabled={disponibles <= 0}
                  value={cantidad}
                  onKeyDown={(e) => {
                    if ([".", ",", "e", "E", "+", "-"].includes(e.key))
                      e.preventDefault();
                  }}
                  onChange={(e) => {
                    const soloDigitos = e.target.value.replace(/\D/g, "");
                    setCantidad(
                      soloDigitos !== "" && Number(soloDigitos) > disponibles
                        ? String(disponibles)
                        : soloDigitos,
                    );
                  }}
                  onBlur={() => setCantidad(String(cantidadValida))}
                />
                <button
                  type="button"
                  className="btn btn--primary"
                  disabled={disponibles <= 0}
                  onClick={() => {
                    onAgregar(producto, cantidadValida);
                    setCantidad("1");
                  }}
                >
                  {disponibles > 0
                    ? "Agregar al carrito"
                    : producto.stock > 0
                      ? "Sin más stock"
                      : "Sin stock"}
                </button>
              </div>
            </div>

            {producto.caracteristicas &&
              producto.caracteristicas.length > 0 && (
                <section
                  className="product-detail__features"
                  aria-labelledby="product-features-title"
                >
                  <h2 id="product-features-title">Características</h2>
                  <ul>
                    {producto.caracteristicas.map((caracteristica, index) => (
                      <li key={index}>{caracteristica}</li>
                    ))}
                  </ul>
                </section>
              )}

            <div className="product-detail__admin">
              <Link
                to={`/admin/editar-producto/${producto._id}`}
                className="btn btn--primary"
              >
                Editar
              </Link>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setConfirmandoEliminar(true)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmandoEliminar && (
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
              Eliminar producto
            </h2>
            <p className="ventana-emergente-mensaje">
              ¿Estás seguro de que deseas eliminar "{producto.nombre}"? Esta
              acción no se puede deshacer.
            </p>
            <div className="ventana-emergente-acciones">
              <button
                type="button"
                className="btn-ventana-emergente btn-ventana-emergente--cancelar"
                onClick={() => setConfirmandoEliminar(false)}
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-ventana-emergente btn-ventana-emergente--aceptar"
                onClick={eliminarProducto}
                disabled={eliminando}
                autoFocus
              >
                {eliminando ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
