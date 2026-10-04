import { useState, useEffect } from "react";

function ProductDetail({ productoId, onAgregar, onVolver }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState("1");

  const cantidadValida = Math.max(1, parseInt(cantidad, 10) || 1);

  useEffect(() => {
    const abortController = new AbortController();
    async function cargarProducto() {
      setCargando(true);
      setError(null);
      setCantidad("1");
      try {
        const base = import.meta.env.VITE_API_URL || "";
        const respuesta = await fetch(`${base}/api/productos/${productoId}`, {
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
  }, [productoId]);

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
          <button type="button" className="btn-vaciar" onClick={onVolver}>
            ← Volver al catálogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail" aria-labelledby="product-detail-title">
      <div className="container">
        <button type="button" className="btn-vaciar" onClick={onVolver}>
          ← Volver al catálogo
        </button>

        <div className="product-detail__content">
          <div className="product-detail__media">
            <img
              src={producto.imagen}
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

            {producto.stock && (
              <div className="product-detail__purchase">
                <label htmlFor="product-quantity">Cantidad</label>
                <div className="product-detail__purchase-controls">
                  <input
                    type="number"
                    id="product-quantity"
                    name="cantidad"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={cantidad}
                    onKeyDown={(e) => {
                      if ([".", ",", "e", "E", "+", "-"].includes(e.key))
                        e.preventDefault();
                    }}
                    onChange={(e) =>
                      setCantidad(e.target.value.replace(/\D/g, ""))
                    }
                    onBlur={() => setCantidad(String(cantidadValida))}
                  />
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => onAgregar(producto, cantidadValida)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            )}
            
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
